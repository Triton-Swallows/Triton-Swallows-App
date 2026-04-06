import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle: string;
  onSubmit: (title: string) => void;
};

export const EditListTitleDialog = ({
  open,
  onOpenChange,
  initialTitle,
  onSubmit,
}: Props) => {
  const [editTitle, setEditTitle] = useState(initialTitle);

  const handleConfirm = () => {
    onSubmit(editTitle);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="bg-[#00588C] text-white rounded py-[5px] px-[40px] w-3/4">
        名前を変更
      </DialogTrigger>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-xl flex flex-col items-center px-3">
        <DialogHeader>
          <DialogTitle>名前を変更</DialogTitle>
          <DialogDescription>新しい名前を入力してください。</DialogDescription>
        </DialogHeader>
        <div className="grid py-[5px]">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="リスト名を入力"
            className="border rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-gray-500 text-white"
          >
            キャンセル
          </Button>
          <Button onClick={handleConfirm} className="bg-green-500 text-white">
            決定
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
