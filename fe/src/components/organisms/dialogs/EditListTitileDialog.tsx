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
      <DialogTrigger className="flex items-center">name change</DialogTrigger>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-none px-3">
        <DialogHeader>
          <DialogTitle>title編集</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="リスト名を入力"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => onOpenChange(false)}>キャンセル</Button>
          <Button onClick={handleConfirm}>決定</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
