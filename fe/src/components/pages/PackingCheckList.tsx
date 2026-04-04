import { useEffect, useState } from "react";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import apiClient from "@/config/apiClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { ListCard } from "../organisms/packingCheckList/ListCard";

export type CheckLists = {
  id: string;
  user_id: string;
  title: string;
  is_favorite: string;
  created_at: string;
  updated_st: string;
};

type CheckListsResponse = {
  data: CheckLists[];
};

export const PackingCheckList = () => {
  const { loginUser, loading } = AuthContextConsumer();
  const [checkLists, setCheckLists] = useState<CheckLists[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchData = async () => {
    if (loading) return;
    setIsFetching(true);
    setFetchError(null);
    try {
      const response = await apiClient.get<CheckListsResponse>("/check-lists");
      setCheckLists(response.data.data);
    } catch {
      setFetchError("情報の取得に失敗しました");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loading, loginUser]);

  const handleCreateList = () => {
    console.log("押された!");
  };

  const handleEdit = (id: string, title: string) => {
    console.log(id);
    console.log(title);
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
          {isFetching ? (
            <div>読み込み中...</div>
          ) : fetchError ? (
            <p className="text-center py-10 text-red-500">{fetchError}</p>
          ) : (
            <div>
              {checkLists.map((checkList) => (
                <ListCard
                  key={checkList.id}
                  checkList={checkList}
                  handleEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="everyoneLine">
          <h2>ここはみんなのリスト</h2>
        </TabsContent>
      </Tabs>
    </>
  );
};
