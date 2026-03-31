import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { HeaderNav } from "../molecules/HeaderNav";
import { PackingTabsNav } from "../molecules/PackingTabsNav";
import { ReviewCard } from "../organisms/reviews/ReviewCard";
import { ReviewPostDialog } from "../organisms/reviews/ReviewPostDialog";
import { ReviewSummaryCard } from "../organisms/reviews/ReviewSummaryCard";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { RequireLoginDialog } from "../organisms/dialogs/requireLoginDialog";

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

export const ReviewsPage = () => {
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
  const [requireLogindialogOpen, setRequireLoginDialogOpen] =
    useState<boolean>(false);

  const fetchData = async () => {
    if (loading) return;

    setIsFetching(true);
    setFetchError(null);

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
        reviewsRes.data.data.map((review) => ({
          ...review,
          like_count: Number(review.like_count),
        })),
      );
      setReviewSummaryList(
        summariesRes.data.data.map((summary) => ({
          ...summary,
          like_count: Number(summary.like_count),
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

  const handleToggleLike = async (reviewId: number, likedByMe: boolean) => {
    if (!loginUser) {
      setRequireLoginDialogOpen(true);
      return;
    }

    setReviewList((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              liked_by_me: !likedByMe,
              like_count: likedByMe
                ? review.like_count - 1
                : review.like_count + 1,
            }
          : review,
      ),
    );

    try {
      if (likedByMe) {
        await apiClient.delete(`/likes/${reviewId}`);
      } else {
        await apiClient.post("/likes", { review_id: reviewId });
      }
    } catch {
      setReviewList((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                liked_by_me: likedByMe,
                like_count: likedByMe
                  ? review.like_count + 1
                  : review.like_count - 1,
              }
            : review,
        ),
      );
    }
  };

  const handleToggleSummaryLike = async (
    summaryId: number,
    likedByMe: boolean,
  ) => {
    setReviewSummaryList((prev) =>
      prev.map((summary) =>
        summary.id === summaryId
          ? {
              ...summary,
              liked_by_me: !likedByMe,
              like_count: likedByMe
                ? summary.like_count - 1
                : summary.like_count + 1,
            }
          : summary,
      ),
    );

    try {
      if (likedByMe) {
        await apiClient.delete(`/summary_likes/${summaryId}`);
      } else {
        await apiClient.post("/summary_likes", { summary_id: summaryId });
      }
    } catch {
      setReviewSummaryList((prev) =>
        prev.map((summary) =>
          summary.id === summaryId
            ? {
                ...summary,
                liked_by_me: likedByMe,
                like_count: likedByMe
                  ? summary.like_count + 1
                  : summary.like_count - 1,
              }
            : summary,
        ),
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await apiClient.post(`/reviews/${country}`, { review: reviewComment });
      setReviewComment("");
      setPostError(null);
      setDialogOpen(false);
      await fetchData();
    } catch {
      setPostError("口コミの投稿に失敗しました");
    }
  };

  return (
    <HeaderLayout>
      <HeaderNav
        path={"/country-list"}
        label="国リスト"
        title="アメリカ（米国）"
      />

      <div className="flex flex-col items-center justify-center gap-2">
        <PackingTabsNav />
        <div className="w-full pb-16 text-sm outline-none">
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
              {reviewList.map((review) => (
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
        </div>
      </div>
      <RequireLoginDialog
        open={requireLogindialogOpen}
        onOpenChange={setRequireLoginDialogOpen}
      />
    </HeaderLayout>
  );
};
