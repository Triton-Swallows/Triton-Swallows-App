import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Button } from "../ui/button";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { NavTab } from "../atoms/NavTba";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PackingList = {
  id: string;
  user_id: string;
  title: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
};

type PackingListResponse = {
  data: PackingList[];
};

const parseDate = (created_at: string) => {
  const date = new Date(created_at);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
};

export const EveryonePackingList = () => {
  const { loginUser, loading } = AuthContextConsumer();
  const [packingLists, setPackingLists] = useState<PackingList[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [copiedListTitle, setCopiedListTitle] = useState<string>("");
  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !loginUser) return;
      setIsFetching(true);
      setFetchError(null);
      try {
        const response =
          await apiClient.get<PackingListResponse>("/check-lists/all");
        setPackingLists(
          response.data.data.filter((ele) => ele.user_id !== loginUser.uid),
        );
      } catch (error) {
        console.error("みんなのリストの取得に失敗しました", error);
        setFetchError("みんなのリストの取得に失敗しました");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [loading, loginUser]);

  const handleClick = async (
    packingListId: string,
    packingListTitle: string,
  ) => {
    if (isCopying) return;

    setIsCopying(true);
    try {
      await apiClient.post(`/check-lists/${packingListId}/copy`);
      setCopiedListTitle(packingListTitle);
      setCopyDialogOpen(true);
    } catch (error) {
      console.error("マイリストへのコピーに失敗しました", error);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <HeaderLayout title="持ち物リスト" showBackButton path={"/"}>
      <div className="flex h-[56px] items-center justify-center gap-[16px] rounded-xl bg-[#99E8E2] px-[10px]">
        <NavTab to="/my-packing-list" label="マイリスト" isActive={false} />
        <NavTab
          to="/everyone-packing-list"
          label="みんなのリスト"
          isActive={true}
        />
      </div>

      {loading || isFetching ? (
        <div>読み込み中...</div>
      ) : fetchError ? (
        <div>{fetchError}</div>
      ) : packingLists.length === 0 ? (
        <div>みんなのリストはまだありません。</div>
      ) : (
        <div className="mx-2 my-3 flex flex-col gap-2 text-[#15544E]">
          {packingLists.map((packingList) => (
            <div
              key={packingList.id}
              className="relative rounded-lg bg-[#99E8E2] p-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              <Link
                to={`/everyone-packing-list/${packingList.id}/items`}
                state={{ title: packingList.title }}
                className="absolute inset-0 z-10 rounded-xl"
                aria-label={`${packingList.title}の持ち物一覧へ`}
              />
              <div className="relative z-20 flex flex-col gap-2 pointer-events-none">
                <p className="text-[24px] font-bold">{packingList.title}</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">
                    更新日: {parseDate(packingList.updated_at)}
                  </p>
                  <Button
                    onClick={() =>
                      handleClick(packingList.id, packingList.title)
                    }
                    disabled={isCopying}
                    className="pointer-events-auto relative z-30 mr-[-4px] bg-[#EAFBFA]"
                  >
                    マイリストへコピー
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog open={copyDialogOpen} onOpenChange={setCopyDialogOpen}>
        <DialogContent showCloseButton={false} className="bg-[#F1F5F9]">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription className="text-[#1D7A4D] bg-white">
              {`このリスト「${copiedListTitle}」はマイリストにコピーされました`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => setCopyDialogOpen(false)}
              className="bg-[#00588C] text-[#FAFAFA]"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </HeaderLayout>
  );
};
