import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import apiClient from "@/config/apiClient";
import { useState, useEffect } from "react";
import defaultUserIcon from "../../../assets/UserIcon.png";
import { RiPencilLine } from "react-icons/ri";

type EditProfileDialogProps = {
  user: {
    user_name: string;
    icon_url: string;
  } | null;
  onUpdate: () => Promise<void>;
};

export const EditProfileDialog = ({
  user,
  onUpdate,
}: EditProfileDialogProps) => {
  const [name, setName] = useState(user?.user_name);
  const [previewUrl, setPreviewUrl] = useState(user?.icon_url);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  let iconUrl = user?.icon_url ?? "";
  const hasUnsavedChanges =
    name !== (user?.user_name ?? undefined) || iconFile !== null;

  useEffect(() => {
    if (open && user) {
      setName(user.user_name);
      setPreviewUrl(user.icon_url);
      setIconFile(null); // ファイル選択もリセット
    }
  }, [open, user]);

  const API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;

  const handleOpenChange = (nextOpen: boolean) => {
    // いま開いている＆ダイアログを閉じようとしている＆未保存の変更がある
    if (open && !nextOpen && hasUnsavedChanges) {
      setConfirmOpen(true);
      return;
    }

    setOpen(nextOpen);
  };

  // 破棄して終了
  const handleDiscard = () => {
    setConfirmOpen(false);
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (iconFile) {
        const formData = new FormData();
        formData.append("image", iconFile);

        const imagaBBResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const imageBBData = await imagaBBResponse.json();
        iconUrl = imageBBData.data.url;
      }
      setPreviewUrl(iconUrl);

      await apiClient.patch("/users", {
        user_name: name,
        icon_url: iconUrl,
      });
      await onUpdate();
      setOpen(false);
    } catch (error) {
      console.error("プロフィールの更新に失敗しました", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="h-9 gap-2 bg-[#00588C] px-4 py-2 text-xs leading-4 text-[#FAF6F0] hover:bg-[#004B77]">
            <RiPencilLine className="size-5 text-[#FAF6F0]" />
            アカウントを編集
          </Button>
        </DialogTrigger>
        <DialogContent
          className="bg-[#FAF6F0] px-4 pb-5 pt-6 ring-0 sm:max-w-[393px] sm:px-8 sm:pb-6"
          showCloseButton
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <DialogHeader className="items-center gap-0 text-center">
              <DialogTitle className="text-[22px] font-medium leading-8 text-[#002B45]">
                プロフィールを編集
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
              <img
                src={previewUrl || defaultUserIcon}
                alt="プロフィールアイコンのプレビュー"
                className="h-[90px] w-[90px] shrink-0 rounded-full object-cover"
              />
              <input
                id="icon"
                type="file"
                accept="image/*"
                className="block w-full max-w-full rounded-full border border-[#D8D8D8] bg-white px-4 py-2 text-sm text-[#333333] shadow-[0px_1px_3px_rgba(0,0,0,0.12)] file:mr-3 file:rounded-full file:border-0 file:px-3 file:py-1 file:font-medium sm:flex-1"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setIconFile(file);
                  setPreviewUrl(
                    file ? URL.createObjectURL(file) : (user?.icon_url ?? ""),
                  );
                }}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-[16px] font-medium leading-6 text-[#002B45]"
              >
                名前:
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-xl border border-[#DCDCDC] bg-white px-4 text-[16px] leading-6 text-[#333333] shadow-[0px_1px_3px_rgba(0,0,0,0.12)] outline-none focus:border-[#7BB7CC]"
              />
              <div className="inline-flex rounded-md bg-[#EAFBFA] px-3 py-1 text-[12px] font-medium leading-4 text-[#002B45]">
                トリトリ内表示のみ（Google非連携）
              </div>
            </div>

            <p className="text-center text-[10px] font-medium leading-4 text-[#002B45] sm:text-[11px]">
              編集を完了したら、「保存する」ボタンを押してください
            </p>

            <DialogFooter className="mx-0 mb-0 rounded-none border-0 bg-transparent p-0">
              <Button
                type="submit"
                className="mx-auto h-12 min-w-[104px] rounded-xl bg-[#00588C] px-8 text-[16px] font-medium text-[#FAF6F0] hover:bg-[#004B77]"
              >
                保存する
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          className="bg-[#FAF6F0] px-5 pb-5 pt-6 ring-0 sm:max-w-[360px] sm:px-6"
          showCloseButton={false}
        >
          <DialogHeader className="items-center gap-3 text-center">
            <DialogTitle className="text-[16px] font-medium leading-6 mb-6 text-[#002B45]">
              編集内容が保存されていません。
              <br />
              終了してもよろしいですか？
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 justify-center mx-0 mb-0 rounded-none border-0 bg-transparent p-0 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl bg-[#AF301F] px-5 text-[14px] text-[#FAFAFA]"
              onClick={handleDiscard}
            >
              破棄して終了
            </Button>
            <div>
              <Button
                type="button"
                className="h-11 rounded-xl bg-[#00588C] px-5 text-[14px] text-[#FAFAFA]"
                onClick={(e) => {
                  e.stopPropagation(); // キャンセルボタンだけを押す(書かないと編集ダイアログの方に保存せず他の部位をクリックしたと検知されて確認ダイアログが開きなおされ、キャンセルできないように見えてしまう)
                  setConfirmOpen(false);
                }}
              >
                キャンセル
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
