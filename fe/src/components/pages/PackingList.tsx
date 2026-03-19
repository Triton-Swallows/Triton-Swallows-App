import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PackingItem = {
  name: string;
  content: string;
  path: string;
};

export const PackingList = () => {
  const itemList: PackingItem[] = [
    {
      name: "パスポート",
      content: "残存期間は帰国日まで有効なもの。IC旅券(e-passport)であること。",
      path: "/usa/packing-list/pasport",
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
      path: "/usa/packing-list/ticket",
    },
    {
      name: "税関申告書",
      content: "機内で配られる。またはデジタル(MCPアプリ等)で申請。",
      path: "/usa/packing-list/tax",
    },
  ];
  return (
    <HeaderLayout>
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
              <div>
                <Link to={item.path}>詳細確認</Link>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="review">ここは口コミです。</TabsContent>
      </Tabs>
    </HeaderLayout>
  );
};
