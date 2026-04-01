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
import { useState } from "react";

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
  const [name, setName] = useState(user?.user_name ?? "TBD");
  // const [iconUrl, setIconUrl] = useState(user.icon_url);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let iconUrl = user?.icon_url ?? "";

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
        <Button variant="outline">プロフィールを編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>プロフィールを編集</DialogTitle>
            <DialogDescription>
              編集を完了したら、「保存する」ボタンを押してください。
            </DialogDescription>
          </DialogHeader>
          <div>
            <div>
              <label htmlFor="name-1">アカウント名</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username-1">プロフィール画像</label>
              <input
                id="icon"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  console.log("e.target.filesとは", e.target.files);
                  setIconFile(e.target.files?.[0] ?? null);
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
