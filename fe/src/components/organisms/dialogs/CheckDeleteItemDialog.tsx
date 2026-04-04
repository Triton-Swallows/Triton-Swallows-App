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
  id: string;
  onDelete: (title: string) => void;
};

export const CheckDeleteItemDialog = ({
  open,
  onOpenChange,
  id,
  onDelete,
}: Props) => {
  const [editId] = useState(id);

  const handleConfirm = () => {
    onDelete(editId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex items-center bg-red-500 text-[#FAF6F0]">
        削除
      </DialogTrigger>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-none px-3">
        <DialogHeader>
          <DialogTitle>このアイテムを削除してもよろしいですか？</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Button
            className="flex items-center bg-red-500 text-[#FAF6F0]"
            onClick={handleConfirm}
          >
            削除
          </Button>
          <Button onClick={() => onOpenChange(false)}>キャンセル</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
