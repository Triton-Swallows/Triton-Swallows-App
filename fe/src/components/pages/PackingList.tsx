import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewPostDialog } from "../organisms/reviews/ReviewPostDialog";
import { ReviewSummaryCard } from "../organisms/reviews/ReviewSummaryCard";
import { ReviewCard } from "../organisms/reviews/ReviewCard";
import { TitleFrame } from "../atoms/TitleFrame";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Link } from "react-router-dom";
import { HeaderNav } from "../molecules/HeaderNav";
import { Button } from "../ui/button";
import type { ChangeEvent } from "react";

type PackingItem = {
  name: string;
  content: string;
  path: string;
};

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

export const PackingList = () => {
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

  const itemList: PackingItem[] = [
    {
      name: "パスポート",
      content: "残存期間は帰国日まで有効なもの。IC旅券(e-passport)であること。",
      path: "",
    },
    {
      name: "ESTA(エスタ)",
      content:
        "オンラインで申請。40ドル。渡航前(推奨72時間前)までに申請・承認が必要。",
      path: "/usa/packing-list/esta",
    },
    {
      name: "往復または次の目的地への航空券",
      content: "滞在終了時にアメリカを出国する航空券。",
      path: "",
    },
    {
      name: "税関申告書",
      content: "機内で配られる。またはデジタル(MCPアプリ等)で申請。",
      path: "",
    },
  ];

  return (
    <HeaderLayout>
      <HeaderNav
        path={"/country-list"}
        label="国リスト"
        title="アメリカ（米国）"
      />

      <Tabs
        defaultValue="items"
        className="flex-col items-center justify-center"
      >
        <TabsList className="h-auto p-0 bg-transparent flex gap-[16px]">
          <TabsTrigger
            value="items"
            className="
            /* 基本レイアウト */
            flex w-[176px] h-[54px] min-h-[36px] items-center justify-center 
            px-[16px] py-[8px] gap-[8px] 
            rounded-l-xl rounded-r-none text-[14px] font-medium
            
            /* デフォルト（未選択）状態 */
            bg-[#FAF6F0] text-[#002B45] border border-[#002B45]
            
            /* アクティブ（選択）状態 */
            data-[state=active]:bg-[#00588C] 
            data-[state=active]:text-white 
            data-[state=active]:border-[#002B45]
            "
          >
            持ち物
          </TabsTrigger>
          <TabsTrigger
            value="review"
            className="
            /* 1.基本レイアウト */
            flex w-[176px] h-[54px] min-h-[36px] items-center justify-center 
            px-[16px] py-[8px] gap-[8px] 
            rounded-r-xl rounded-l-none text-[14px] font-medium
            
            /* デフォルト（未選択）状態 */
            bg-[#FAF6F0] text-[#002B45] border border-[#002B45]
            
            /* アクティブ（選択）状態 */
            data-[state=active]:bg-[#00588C] 
            data-[state=active]:text-white 
            data-[state=active]:border-[#002B45]
            "
          >
            口コミ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <div className="text-[#002B45] text-[16px] bg-[#A8C9DE] my-[10px] ">
            日本国籍の方が、観光または商用目的でアメリカへ渡航する場合、ビザ免除プログラム（WWP）に基づき、以下の条件を満たすことで最大90日間の無査証（ビザなし）滞在が可能です。
          </div>
          <TitleFrame
            title="必要書類"
            date="更新日時　2026/3/24"
            superivisor=""
          />
          {itemList.map((item) => (
            <div
              key={item.name}
              className="bg-[#A8C9DE] mx-[8px] my-[16px] rounded-sm"
            >
              {item.path ? (
                <Link to={item.path}>
                  <div className="text-[#002B45] text-[14px] py-[16px] pr-[12px] pl-[5px]">
                    <span className="font-bold">・{item.name}： </span>
                    <span>{item.content}</span>
                  </div>
                </Link>
              ) : (
                <div className="text-[#002B45] text-[14px] py-[16px] pr-[12px] pl-[5px]">
                  <span className="font-bold">・{item.name}： </span>
                  <span>{item.content}</span>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <a
              href={
                !loginUser || loading
                  ? undefined
                  : "https://forms.gle/MvXjx6ckqDqsyGPT9"
              }
              target="_blank"
              className="flex justify-center w-[185px] h-[36px] mb-3"
            >
              <Button
                className="bg-[#00588C] rounded-xl text-[#FAF6F0] text-[14px] py-[8px] px-[16px] "
                disabled={!loginUser || loading}
              >
                情報変更を依頼する
              </Button>
            </a>
          </div>
        </TabsContent>
        <TabsContent value="review" className="pb-16">
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
                    className="border"
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

              {sortedReviews.map((review) => (
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
              ))}
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
        </TabsContent>
      </Tabs>
    </HeaderLayout>
  );
};
