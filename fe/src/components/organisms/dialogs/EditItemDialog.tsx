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
import type { Item } from "@/components/pages/CheckListItems";
import { CheckDeleteItemDialog } from "./CheckDeleteItemDialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
  handleDelete: (id: string) => void;
  onStartNameEdit: () => void;
};

export const EditItemDialog = ({
  open,
  onOpenChange,
  item,
  handleDelete,
  onStartNameEdit,
}: Props) => {
  const [titleDialogOpen, setTitleDialogOpen] = useState<boolean>(false);

  const onDelete = (id: string) => {
    handleDelete(id);
    setTitleDialogOpen(false); // 自身のダイアログを閉じる
    onOpenChange(false); // 親のダイアログも閉じる
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex items-center">編集</DialogTrigger>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-none px-3">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">編集ダイアログ</div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Button
          onClick={() => {
            onStartNameEdit(); // 親に通知してダイアログを閉じる
          }}
        >
          名前を変更する
        </Button>
        <CheckDeleteItemDialog
          open={titleDialogOpen}
          onOpenChange={setTitleDialogOpen}
          id={item.id}
          onDelete={onDelete}
        />
        {/* <Button
          className="bg-red-500 text-[#FAF6F0]"
          onClick={() => onDelete(item.id)}
        >
          削除
        </Button> */}
      </DialogContent>
    </Dialog>
  );
};
