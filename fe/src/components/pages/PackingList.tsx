import { HeaderLayout } from "../templetes/HeaderLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PackingList = () => {
  const itemList = [
    "パスポート",
    "ESTA(エスタ)",
    "往復または次の目的地への航空券",
    "税関申告書",
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
            <div key={item}>・{item}</div>
          ))}
        </TabsContent>
        <TabsContent value="review">
          口コミChange your password here.
        </TabsContent>
      </Tabs>
    </HeaderLayout>
  );
};
