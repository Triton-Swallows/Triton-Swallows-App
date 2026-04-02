import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { ReviewPostDialog } from "../organisms/reviews/ReviewPostDialog";
import { ReviewSummaryCard } from "../organisms/reviews/ReviewSummaryCard";
import { ReviewCard } from "../organisms/reviews/ReviewCard";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Link } from "react-router-dom";
import { HeaderNav } from "../molecules/HeaderNav";
import { Button } from "../ui/button";
import type { ChangeEvent } from "react";
import { RequireLoginDialog } from "../organisms/dialogs/requireLoginDialog";
import { GeminiChatLauncher } from "../organisms/layout/GeminiChatLauncher";

type ReviewSummaryApiItem = {
  id: number;
  summary: string;
  like_count: string;
  created_at: string;
  liked_by_me: boolean;
};

type ReviewSummaryItem = {
  id: number;
  summary: string;
  like_count: number;
  created_at: string;
  liked_by_me: boolean;
};

type ReviewApiItem = {
  user_name: string;
  user_icon: string;
  id: number;
  review: string;
  like_count: string;
  created_at: string;
  liked_by_me: boolean;
};

type ReviewItem = {
  user_name: string;
  user_icon: string;
  id: number;
  review: string;
  like_count: number;
  created_at: string;
  liked_by_me: boolean;
};
type SortType = "likes" | "newest";

export const Review = () => {
  const { country } = useParams<{ country: string }>();
  const { loginUser, loading } = AuthContextConsumer();
  const [reviewSummaryList, setReviewSummaryList] = useState<
    ReviewSummaryItem[]
  >([]);
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [tmpSearchReviewText, setTmpSearchReviewText] = useState<string>("");
  const [searchReviewText, setSearchReviewText] = useState<string>("");
  const [requireLogindialogOpen, setRequireLoginDialogOpen] =
    useState<boolean>(false);

  const fetchData = async () => {
    if (loading) return;
    setIsFetching(true);
    setFetchError(null);
    // ログイン状態に応じてパスのプレフィックスを決定
    const pathPrefix = loginUser ? "" : "/guest";
    try {
      const [reviewsRes, summariesRes] = await Promise.all([
        apiClient.get<{ data: ReviewApiItem[] }>(
          `${pathPrefix}/reviews/${country}`,
        ),
        apiClient.get<{ data: ReviewSummaryApiItem[] }>(
          `${pathPrefix}/summaries/${country}`,
        ),
      ]);
      setReviewList(
        reviewsRes.data.data.map((r) => ({
          ...r,
          like_count: Number(r.like_count),
        })),
      );
      setReviewSummaryList(
        summariesRes.data.data.map((r) => ({
          ...r,
          like_count: Number(r.like_count),
        })),
      );
    } catch {
      setFetchError("情報の取得に失敗しました");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading, loginUser]);

  const handleToggleLike = async (review_id: number, liked_by_me: boolean) => {
    if (!loginUser) {
      setRequireLoginDialogOpen(true);
      return;
    }

    // 一旦UI上ではすぐにいいねが押せた/取り消せた表示にする
    // その後APIをたたいて、失敗したら元の表示に戻す
    // ReviewCard.tsxにてliked_by_meのtrue/falseでハート色を反転させている
    setReviewList((prev) =>
      prev.map((r) =>
        r.id === review_id
          ? {
              ...r,
              liked_by_me: !liked_by_me,
              like_count: liked_by_me ? r.like_count - 1 : r.like_count + 1,
            }
          : r,
      ),
    );

    try {
      // すでにいいね済みの場合、取り消し操作のため、deleteでいいねリスト(likesテーブル)から削除
      if (liked_by_me) {
        await apiClient.delete(`/likes/${review_id}`);
      } else {
        await apiClient.post("/likes", { review_id });
      }
    } catch {
      // 失敗時は表示をロールバック
      setReviewList((prev) =>
        prev.map((r) =>
          r.id === review_id
            ? {
                ...r,
                liked_by_me,
                like_count: liked_by_me ? r.like_count + 1 : r.like_count - 1,
              }
            : r,
        ),
      );
    }
  };

  const handleToggleSummaryLike = async (
    summary_id: number,
    liked_by_me: boolean,
  ) => {
    setReviewSummaryList((prev) =>
      prev.map((r) =>
        r.id === summary_id
          ? {
              ...r,
              liked_by_me: !liked_by_me,
              like_count: liked_by_me ? r.like_count - 1 : r.like_count + 1,
            }
          : r,
      ),
    );

    try {
      if (liked_by_me) {
        await apiClient.delete(`/summary_likes/${summary_id}`);
      } else {
        await apiClient.post("/summary_likes", { summary_id });
      }
    } catch {
      setReviewSummaryList((prev) =>
        prev.map((r) =>
          r.id === summary_id
            ? {
                ...r,
                liked_by_me,
                like_count: liked_by_me ? r.like_count + 1 : r.like_count - 1,
              }
            : r,
        ),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.post(`/reviews/${country}`, { review: reviewComment });
      setReviewComment("");
      setDialogOpen(false);
      await fetchData();
    } catch {
      setPostError("口コミの投稿に失敗しました");
    }
  };

  const sortedReviews = useMemo(() => {
    // 検索
    const filteredList = reviewList.filter(
      (item) =>
        item.review?.toLowerCase().includes(searchReviewText.toLowerCase()) ||
        item.user_name?.toLowerCase().includes(searchReviewText.toLowerCase()),
    );
    // 新着順
    if (sortBy === "newest") {
      return filteredList;
    }
    // いいね順
    return [...filteredList].sort((a, b) => b.like_count - a.like_count);
  }, [reviewList, sortBy, searchReviewText]);

  const onchangeSearchReviewText = (e: ChangeEvent<HTMLInputElement>) => {
    setTmpSearchReviewText(e.target.value);
  };

  const onClickSearchReview = () => {
    setSearchReviewText(tmpSearchReviewText);
  };

  return (
    <HeaderLayout>
      <HeaderNav
        path={"/country-list"}
        label="国リスト"
        title="アメリカ（米国）"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="h-auto p-0 bg-transparent flex gap-[16px]">
          <Link
            to="/usa/packing-list"
            className="
            /* 基本レイアウト */
            flex w-[176px] h-[54px] min-h-[36px] items-center justify-center 
            px-[16px] py-[8px] gap-[8px] 
            rounded-l-xl rounded-r-none text-[14px] font-medium
            
            /* デフォルト（未選択）状態 */
            bg-[#FAF6F0] text-[#002B45] border border-[#002B45]
            "
          >
            持ち物
          </Link>
          <Link
            to="/usa/reviews"
            className="
            /* 1.基本レイアウト */
            flex w-[176px] h-[54px] min-h-[36px] items-center justify-center 
            px-[16px] py-[8px] gap-[8px] 
            rounded-r-xl rounded-l-none text-[14px] font-medium
            
            /* デフォルト（未選択）状態 */
            bg-[#00588C] text-white border border-[#002B45]
            "
          >
            口コミ
          </Link>
        </div>
        <div className="pb-16">
          {isFetching && <p>読み込み中...</p>}
          {fetchError && <p>{fetchError}</p>}
          {!isFetching && !fetchError && (
            <>
              <h2>要約</h2>
              {reviewSummaryList.map((reviewSummary) => (
                <ReviewSummaryCard
                  key={reviewSummary.id}
                  summary_id={reviewSummary.id}
                  summary={reviewSummary.summary}
                  like_count={reviewSummary.like_count}
                  created_at={reviewSummary.created_at}
                  liked_by_me={reviewSummary.liked_by_me}
                  onToggleLike={handleToggleSummaryLike}
                />
              ))}
              <p>※この要約は会社によって審査した上で掲載しています。</p>

              <div className="flex">
                <Button
                  className="bg-[#00588C] text-[#FAF6F0]"
                  onClick={() => setSortBy("likes")}
                >
                  いいねが多い順
                </Button>
                <Button
                  className="bg-[#00588C] text-[#FAF6F0]"
                  onClick={() => setSortBy("newest")}
                >
                  新着順
                </Button>
                <div className="flex items-center">
                  <input
                    placeholder="検索欄"
                    className="border w-32"
                    onChange={onchangeSearchReviewText}
                  />
                </div>
                <Button
                  className="bg-[#00588C] text-[#FAF6F0]"
                  onClick={onClickSearchReview}
                >
                  検索
                </Button>
              </div>

              {sortedReviews.length === 0 ? (
                <div>該当項目なし</div>
              ) : (
                sortedReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    user_name={review.user_name}
                    user_icon={review.user_icon}
                    review_id={review.id}
                    review={review.review}
                    like_count={review.like_count}
                    created_at={review.created_at}
                    liked_by_me={review.liked_by_me}
                    onToggleLike={handleToggleLike}
                  />
                ))
              )}
              {postError && <div>{postError}</div>}
              <ReviewPostDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                disabled={!loginUser || loading}
                reviewComment={reviewComment}
                onCommentChange={setReviewComment}
                onSubmit={handleSubmit}
              />
            </>
          )}
        </div>
      </div>
      <RequireLoginDialog
        open={requireLogindialogOpen}
        onOpenChange={setRequireLoginDialogOpen}
        redirectPath={location.pathname}
      />
      <GeminiChatLauncher />
    </HeaderLayout>
  );
};
