import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  let iconUrl = user?.icon_url ?? "";

  useEffect(() => {
    if (open && user) {
      setName(user.user_name);
      setIconFile(null); // ファイル選択もリセット
    }
  }, [open, user]);

  const API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 gap-2 bg-[#00588C] px-4 py-2 text-xs leading-4 text-[#FAF6F0] hover:bg-[#004B77]">
          <RiPencilLine className="size-5 text-[#FAF6F0]" />
          アカウントを編集
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <img
              src={previewUrl || defaultUserIcon}
              alt="プロフィールアイコンのプレビュー"
              className="w-[120px] h-[120px] rounded-full"
            />
            <DialogTitle>プロフィールを編集</DialogTitle>
            <DialogDescription>
              編集を完了したら、「保存する」ボタンを押してください。
            </DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <label htmlFor="name-1">アカウント名を変更：</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border"
              />
            </div>
            <div>
              <label htmlFor="icon" className="text-blue-500 bg-white rounded">
                プロフィール画像を変更
              </label>
              <input
                id="icon"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setIconFile(file);
                  setPreviewUrl(file ? URL.createObjectURL(file) : ""); // https://zenn.dev/takezzoh/articles/ca64a9007d49b5
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" variant="outline" className="bg-[green]">
              保存する
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
