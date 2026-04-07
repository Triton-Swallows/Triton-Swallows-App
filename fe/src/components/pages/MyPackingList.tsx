import { useEffect, useState } from "react";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import apiClient from "@/config/apiClient";
import { ListCard } from "../organisms/packingCheckList/ListCard";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { NavTab } from "../atoms/NavTba";
import { ActionBar } from "../atoms/ActionBar";
import HeaderPic from "../../assets/checklistbg.jpg";
import { Spinner } from "@/components/ui/spinner";

export type CheckLists = {
  id: string;
  user_id: string;
  title: string;
  is_favorite: string;
  hashtag: string;
  created_at: string;
  updated_at: string;
};

type CheckListsResponse = {
  data: CheckLists[];
};

export const MyPackingList = () => {
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

  const handleCreateList = async () => {
    try {
      const response = await apiClient.post("/check-lists", {
        title: "新しいリスト",
      });

      const createdList = response.data.data;

      setCheckLists((prev) => [createdList, ...prev]);
    } catch (error) {
      console.error("エラー", error);
    }
  };

  const handleEdit = async (id: string, title: string) => {
    setCheckLists((prev) =>
      prev.map((list) =>
        list.id === id
          ? {
              ...list,
              title: title,
            }
          : list,
      ),
    );
    try {
      await apiClient.patch(`/check-lists/${id}`, {
        title,
      });
    } catch (error) {
      console.error("エラー", error);
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    setCheckLists((prev) => prev.filter((list) => list.id !== id));
    try {
      await apiClient.delete(`/check-lists/${id}`);
    } catch (error) {
      console.error("エラー", error);
      fetchData();
    }
  };

  return (
    <>
      <HeaderLayout
        title="持ち物リスト"
        showBackButton
        path={"/"}
        backgroundImage={HeaderPic}
      >
        <div className="flex flex-col justify-center pt-[10px]">
          {/* タブの表示部分 */}
          <div className="flex bg-[#99E8E2] h-[56px] gap-[16px] rounded-xl items-center justify-center px-[10px] w-9/10 mx-auto">
            <NavTab to="/my-packing-list" label="マイリスト" isActive={true} />
            <NavTab
              to="/everyone-packing-list"
              label="みんなのリスト"
              isActive={false}
            />
          </div>

          <div className="pt-[6px] w-full">
            <ActionBar
              actions={[
                { label: "＋新規リストを作成", onClick: handleCreateList },
              ]}
            />
          </div>
          {isFetching ? (
            <div className="flex py-10 items-center justify-center">
              <Spinner />
            </div>
          ) : fetchError ? (
            <p className="text-center py-10 text-red-500">{fetchError}</p>
          ) : (
            <div className="px-[10px] w-full">
              {checkLists.map((checkList) => (
                <ListCard
                  key={checkList.id}
                  checkList={checkList}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </HeaderLayout>
    </>
  );
};
