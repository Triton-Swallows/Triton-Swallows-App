import { Link } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PackingItem = {
  name: string;
  path: string;
};

export const PackingList = () => {
  const itemList: PackingItem[] = [
    { name: "パスポート", path: "/pasport" },
    { name: "ESTA(エスタ)", path: "/esta" },
    { name: "往復または次の目的地への航空券", path: "/ticket" },
    { name: "税関申告書", path: "/tax" },
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
          持ち物Make changes to your account here.
          {itemList.map((item) => (
            <div key={item.name}>
              <div>・{item.name}</div>
              <div>
                <Link to={item.path}>詳細確認</Link>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="review">
          口コミChange your password here.
        </TabsContent>
      </Tabs>
    </HeaderLayout>
  );
};
