import { useEffect, useState } from "react";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Button } from "../ui/button";
import { useLocation, useParams } from "react-router-dom";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { ActionBar } from "../atoms/ActionBar";
import HeaderPic from "../../assets/checklistbg.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

type Item = {
  id: string;
  check_list_id: string;
  item: string;
  status: string;
  category: string;
  created_at: string;
  updated_at: string;
};

type ItemsResponse = {
  data: Item[];
};

type CheckList = {
  id: string;
  title: string;
};

type CheckListsResponse = {
  data: CheckList[];
};

export const EveryonePackingListItems = () => {
  const { id: checkListId } = useParams<{ id: string }>();
  const { loginUser, loading } = AuthContextConsumer();

  const [items, setItems] = useState<Item[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const location = useLocation(); //location.stateで、表示しているリストのタイトルをリスト一覧ページから取得できる
  const { title } = location.state as { title?: string };

  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);
  const [copyTargetItem, setCopyTargetItem] = useState<Item | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState<boolean>(false);

  const [myCheckLists, setMyCheckLists] = useState<CheckList[]>([]);
  const [isFetchingCheckLists, setIsFetchingCheckLists] =
    useState<boolean>(false);
  const [selectedCheckListId, setSelectedCheckListId] = useState<string>("");
  const [selectedCheckListTitle, setSelectedCheckListTitle] =
    useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !loginUser || !checkListId) return;
      setIsFetching(true);
      setFetchError(null);
      try {
        const response = await apiClient.get<ItemsResponse>(
          `/items/${checkListId}`,
        );
        setItems(response.data.data);
      } catch (error) {
        console.error("持ち物の取得に失敗しました", error);
        setFetchError("持ち物の取得に失敗しました");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [loading, loginUser, checkListId]);

  // コピー先(check_list_id)となる自分のリスト一覧を取得
  const fetchMyCheckLists = async () => {
    if (loading || !loginUser) return;
    setIsFetchingCheckLists(true);
    setCopyError(null);

    try {
      const response = await apiClient.get<CheckListsResponse>("/check-lists");
      setMyCheckLists(response.data.data);
      setSelectedCheckListId(response.data.data[0]?.id || ""); // 先頭をデフォ選択しておく
      setSelectedCheckListTitle(response.data.data[0]?.title || "");
    } catch (error) {
      console.error("コピー先リストの取得に失敗しました", error);
      setCopyError("コピー先リストの取得に失敗しました");
    } finally {
      setIsFetchingCheckLists(false);
    }
  };

  const handleClick = async (item: Item) => {
    setCopySuccess(null);
    setCopyTargetItem(item);
    setCopyDialogOpen(true);
    await fetchMyCheckLists();
  };

  const handleCopyItem = async () => {
    if (!copyTargetItem || !selectedCheckListId || isCopying) return;

    setIsCopying(true);
    setCopyError(null);

    try {
      await apiClient.post(`/items/${copyTargetItem.id}/copy`, {
        check_list_id: selectedCheckListId,
      });

      setCopySuccess(selectedCheckListTitle);
      setCopyDialogOpen(false);
      setSuccessDialogOpen(true);
      setCopyTargetItem(null);
    } catch (error) {
      console.error("コピー失敗", error);
      setCopyError("コピーに失敗しました");
    } finally {
      setIsCopying(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setCopyDialogOpen(open);

    // open=false=ダイアログが閉じたときのクリーンアップ
    if (!open) {
      setCopyTargetItem(null);
      setCopyError(null);
      setIsCopying(false);
      setSelectedCheckListId("");
      setSelectedCheckListTitle("");
    }
  };

  return (
    <>
      <HeaderLayout
        title={title}
        showBackButton
        path="/everyone-packing-list"
        backgroundImage={HeaderPic}
      >
        <div className="pt-[6px] w-full">
          <ActionBar actions={[{ label: "" }]} />
        </div>

        {loading || isFetching ? (
          <div className="flex py-10 items-center justify-center">
            <Spinner />
          </div>
        ) : fetchError ? (
          <div>{fetchError}</div>
        ) : items.length === 0 ? (
          <div>持ち物はまだありません。</div>
        ) : (
          <div className="mx-2 flex flex-col text-[#15544E]">
            {items.map((item) => (
              <div key={item.id} className="px-3 py-1">
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium text-[16px]">{item.item}</p>
                  <div className="flex shrink-0 items-center justify-end">
                    <Button
                      onClick={() => handleClick(item)}
                      className="mr-[-8px] h-8 rounded-l-none rounded-r-xl bg-[#99E8E2] px-2 text-[12px]"
                    >
                      リストへコピー
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </HeaderLayout>

      <Dialog open={copyDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="bg-[#F1F5F9]">
          <DialogHeader>
            <DialogTitle className="text-[#15544E]">
              コピー先のリストを選択
            </DialogTitle>
            <DialogDescription>
              {copyTargetItem &&
                `「${copyTargetItem.item}」を追加するマイリストを選んでください。`}
            </DialogDescription>
          </DialogHeader>

          {isFetchingCheckLists ? (
            <div className="flex py-10 items-center justify-center">
              <Spinner />
            </div>
          ) : myCheckLists.length === 0 ? (
            <div>コピー先のマイリストがありません。</div>
          ) : (
            <div className="flex flex-col gap-2 text-sm text-[#15544E]">
              <p>コピー先</p>
              <div className="max-h-30 space-y-2 overflow-y-auto rounded-lg border border-[#99E8E2] bg-white p-2">
                {myCheckLists.map((checkList) => {
                  const isSelected = selectedCheckListId === checkList.id;

                  return (
                    <button
                      key={checkList.id}
                      type="button"
                      onClick={() => {
                        setSelectedCheckListId(checkList.id);
                        setSelectedCheckListTitle(checkList.title);
                      }}
                      className={`flex w-full rounded-lg font-medium border px-3 py-2 transition ${
                        isSelected
                          ? "border-[#2BA89D] bg-[#EAFBFA]"
                          : "border-transparent bg-[#F8FEFD] hover:border-[#99E8E2]"
                      }`}
                    >
                      {checkList.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {copyError && <p className="text-sm text-red-500">{copyError}</p>}

          <div className="flex justify-end gap-2">
            <Button
              onClick={handleCopyItem}
              disabled={
                isCopying || isFetchingCheckLists || !selectedCheckListId
              }
              className="bg-[#99E8E2] text-[#15544E] hover:bg-[#87ddd6]"
            >
              {isCopying ? "コピー中..." : "このリストにコピー"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent showCloseButton={false} className="bg-[#F1F5F9]">
          <DialogHeader>
            <DialogDescription className="bg-white text-center text-[14px] font-medium text-[#1D7A4D]">
              {copySuccess && (
                <>
                  このアイテムは「{copySuccess}」
                  <br />
                  リストにコピーされました
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => setSuccessDialogOpen(false)}
              className="bg-[#00588C] text-[#FAFAFA]"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
