import { HeaderLayout } from "../templetes/HeaderLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackIcon } from "../atoms/BackIcon";
import { PrimaryLink } from "../atoms/Link";
import { ReviewSummaryCard } from "../organisms/reviews/ReviewSummaryCard";

type PackingItem = {
  name: string;
  content: string;
  path: string;
};

type ReviewItem = {
  review_id: number;
  review: string;
  like: number;
  created_at: string;
};

export const PackingList = () => {
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

  const reviewSummaryList: ReviewItem[] = [
    {
      review_id: 1,
      review: "意外に蒸し暑い",
      like: 10,
      created_at: "2026年3月12日",
    },
    {
      review_id: 2,
      review: "302番道路、19時以降は危険",
      like: 20,
      created_at: "2026年2月24日",
    },
    {
      review_id: 3,
      review: "解熱剤なら持って行けた",
      like: 30,
      created_at: "2025年8月11日",
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
          <h2>要約</h2>
          {reviewSummaryList.map((reviewSummary) => (
            <ReviewSummaryCard
              review_id={reviewSummary.review_id}
              review={reviewSummary.review}
              like={reviewSummary.like}
              created_at={reviewSummary.created_at}
            />
          ))}
          <p>※この要約は会社によって審査した上で掲載しています。</p>
        </TabsContent>
      </Tabs>
    </HeaderLayout>
  );
};
