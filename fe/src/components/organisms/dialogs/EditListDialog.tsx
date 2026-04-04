import { useState } from "react";
import type { CheckLists } from "@/components/pages/PackingCheckList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditListTitleDialog } from "./EditListTitileDialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkList: CheckLists;
  handleEdit: (id: string, title: string) => void;
};

export const EditListDialog = ({
  open,
  onOpenChange,
  checkList,
  handleEdit,
}: Props) => {
  const [titleDialogOpen, setTitleDialogOpen] = useState<boolean>(false);

  const onSubmit = (newTitle: string) => {
    handleEdit(checkList.id, newTitle);
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
        <EditListTitleDialog
          open={titleDialogOpen}
          onOpenChange={setTitleDialogOpen}
          initialTitle={checkList.title}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
