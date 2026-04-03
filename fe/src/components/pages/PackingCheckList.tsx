import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
export const PackingCheckList = () => {
  const handleCreateList = () => {
    console.log("押された!");
  };

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
          <Button
            className="bg-[#00588C] text-[#FAF6F0]"
            onClick={handleCreateList}
          >
            +新規リスト作成
          </Button>
        </TabsContent>
        <TabsContent value="everyoneLine">
          <h2>ここはみんなのリスト</h2>
        </TabsContent>
      </Tabs>
    </>
  );
};
