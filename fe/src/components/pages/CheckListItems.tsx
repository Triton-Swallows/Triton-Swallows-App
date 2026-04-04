import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import apiClient from "@/config/apiClient";
import { ItemCard } from "../organisms/items/ItemCard";
import { RiAddLargeLine } from "react-icons/ri";

export type Item = {
  id: string;
  check_list_id: string;
  item: string;
  status: string;
  category: string;
  created_at: string;
  updated_st: string;
};

type ItemResponse = {
  data: Item[];
};

export const CheckListItems = () => {
  const { id: check_list_id } = useParams<{ id: string }>();
  const { loginUser, loading } = AuthContextConsumer();
  const [Items, setItems] = useState<Item[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [itemName, setItemName] = useState<string>("");
  const [isComposing, setIsComposing] = useState(false); // （日本語）変換中かを判定する
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async () => {
    if (loading || !check_list_id) return;
    setIsFetching(true);
    setFetchError(null);
    try {
      const response = await apiClient.get<ItemResponse>(
        `/items/${check_list_id}`,
      );
      setItems(response.data.data);
    } catch {
      setFetchError("情報の取得に失敗しました");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loginUser, loading, check_list_id]);

  const handleCreateList = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      const targetName = itemName.trim() === "" ? "新しい持ち物" : itemName;
      try {
        const response = await apiClient.post(`/items/${check_list_id}`, {
          title: targetName,
        });

        const createdList = response.data.data;

        setItems((prev) => [createdList, ...prev]);
        setItemName("");
      } catch (error) {
        console.error("エラー", error);
      }
    }
  };

  const handleEdit = async (id: string, item: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              item: item,
            }
          : i,
      ),
    );
    setEditingId(null);
    try {
      await apiClient.patch(`/items/${id}`, {
        item,
      });
    } catch (error) {
      console.error("エラー", error);
    }
  };

  const handleDelete = async (id: string) => {
    setItems((prev) => prev.filter((list) => list.id !== id));
    try {
      await apiClient.delete(`/items/${id}`);
    } catch (error) {
      console.error("エラー", error);
    }
  };

  return (
    <>
      <div>このページはチェックリストです。</div>
      <p>マイリスト：{check_list_id}</p>
      {isFetching ? (
        <div>読み込み中...</div>
      ) : fetchError ? (
        <p className="text-center py-10 text-red-500">{fetchError}</p>
      ) : (
        <div>
          {Items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              isEditing={editingId === item.id} // 編集モード判定
              onEditClick={() => setEditingId(item.id)} // 編集開始
              onCancel={() => setEditingId(null)} // 編集キャンセル
            />
          ))}
          <div className="flex items-center border bg-[#99E8E2] my-1">
            <RiAddLargeLine />
            <input
              className="flex items-center bg-[#99E8E2]"
              placeholder="Type to add new item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={handleCreateList}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
