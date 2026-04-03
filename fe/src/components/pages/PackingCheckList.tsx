import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export const PackingCheckList = () => {
  return (
    <>
      <div>ここは新しい機能ページです</div>
      <div>がんばるぞ</div>
      <Tabs defaultValue="myList" className="flex-col">
        <TabsList variant="line">
          <TabsTrigger value="myList">マイリスト</TabsTrigger>
          <TabsTrigger value="everyoneLine">みんなのリスト</TabsTrigger>
        </TabsList>
        <TabsContent value="myList">
          <h2>ここはマイリスト</h2>
        </TabsContent>
        <TabsContent value="everyoneLine">
          <h2>ここはみんなのリスト</h2>
        </TabsContent>
      </Tabs>
    </>
  );
};
