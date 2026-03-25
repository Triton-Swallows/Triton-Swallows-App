import { useEffect, useState } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackIcon } from "../atoms/BackIcon";
import { PrimaryLink } from "../atoms/Link";
import { ReviewSummaryCard } from "../organisms/reviews/ReviewSummaryCard";
import { ReviewCard } from "../organisms/reviews/ReviewCard";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type PackingItem = {
  name: string;
  content: string;
  path: string;
};

type ReviewSummaryItem = {
  summary_id: number;
  summary: string;
  count: number;
  created_at: string;
  liked_by_me: boolean;
};

type ReviewItem = {
  user_name: string;
  user_icon: string;
  review_id: number;
  review: string;
  count: number;
  created_at: string;
  liked_by_me: boolean;
};

export const PackingList = () => {
  const { loading } = AuthContextConsumer();
  const [reviewSummaryList, setReviewSummaryList] = useState<
    ReviewSummaryItem[]
  >([]);
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      setIsFetching(true);
      setFetchError(null);
      try {
        const [reviewsRes, summariesRes] = await Promise.all([
          apiClient.get<{ data: ReviewItem[] }>("/reviews/usa"),
          apiClient.get<{ data: ReviewSummaryItem[] }>("/summaries/usa"),
        ]);
        setReviewList(reviewsRes.data.data);
        setReviewSummaryList(summariesRes.data.data);
      } catch {
        setFetchError("情報の取得に失敗しました");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [loading]);

  const handleToggleLike = async (review_id: number, liked_by_me: boolean) => {
    // 一旦UI上ではすぐにいいねが押せた/取り消せた表示にする
    // その後APIをたたいて、失敗したら元の表示に戻す
    // ReviewCard.tsxにてliked_by_meのtrue/falseでハート色を反転させている
    setReviewList((prev) =>
      prev.map((r) =>
        r.review_id === review_id
          ? {
              ...r,
              liked_by_me: !liked_by_me,
              count: liked_by_me ? r.count - 1 : r.count + 1,
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
          r.review_id === review_id
            ? {
                ...r,
                liked_by_me,
                count: liked_by_me ? r.count + 1 : r.count - 1,
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
        r.summary_id === summary_id
          ? {
              ...r,
              liked_by_me: !liked_by_me,
              count: liked_by_me ? r.count - 1 : r.count + 1,
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
          r.summary_id === summary_id
            ? {
                ...r,
                liked_by_me,
                count: liked_by_me ? r.count + 1 : r.count - 1,
              }
            : r,
        ),
      );
    }
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
      <BackIcon path={"/country-list"} label="国リスト" />
      <h1>アメリカ(米国)</h1>
      <Tabs defaultValue="items" className="flex-col">
        <TabsList variant="line">
          <TabsTrigger value="items">持ち物</TabsTrigger>
          <TabsTrigger value="review">口コミ</TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          <h2>必要書類</h2>
          {itemList.map((item) => (
            <div key={item.name}>
              <div>
                ・{item.name}:{item.content}
              </div>
              {item.path !== "" && (
                <div>
                  <PrimaryLink path={item.path}>詳細確認</PrimaryLink>
                </div>
              )}
            </div>
          ))}
        </TabsContent>
        <TabsContent value="review">
          {isFetching && <p>読み込み中...</p>}
          {fetchError && <p>{fetchError}</p>}
          {!isFetching && !fetchError && (
            <>
              <h2>要約</h2>
              {reviewSummaryList.map((reviewSummary) => (
                <ReviewSummaryCard
                  key={reviewSummary.summary_id}
                  summary_id={reviewSummary.summary_id}
                  summary={reviewSummary.summary}
                  count={reviewSummary.count}
                  created_at={reviewSummary.created_at}
                  liked_by_me={reviewSummary.liked_by_me}
                  onToggleLike={handleToggleSummaryLike}
                />
              ))}
              <p>※この要約は会社によって審査した上で掲載しています。</p>
              {reviewList.map((review) => (
                <ReviewCard
                  key={review.review_id}
                  user_name={review.user_name}
                  user_icon={review.user_icon}
                  review_id={review.review_id}
                  review={review.review}
                  count={review.count}
                  created_at={review.created_at}
                  liked_by_me={review.liked_by_me}
                  onToggleLike={handleToggleLike}
                />
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </HeaderLayout>
  );
};
