import { useState } from "react";
import type { CheckLists } from "@/components/pages/MyPackingList";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditListTitleDialog } from "./EditListTitileDialog";
import { CheckDeleteItemDialog } from "./CheckDeleteItemDialog";
import { CopyListDialog } from "./CopyListDialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkList: CheckLists;
  handleEdit: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
  handleCopy: (id: string) => void;
};

export const EditListDialog = ({
  open,
  onOpenChange,
  checkList,
  handleEdit,
  handleDelete,
  handleCopy,
}: Props) => {
  const [titleDialogOpen, setTitleDialogOpen] = useState<boolean>(false);
  const [copyDialogOpen, setCopyDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const onSubmit = (newTitle: string) => {
    handleEdit(checkList.id, newTitle);
    setTitleDialogOpen(false); // 自身のダイアログを閉じる
    onOpenChange(false); // 親のダイアログも閉じる
  };

  const onDelete = (id: string) => {
    handleDelete(id);
    setTitleDialogOpen(false); // 自身のダイアログを閉じる
    onOpenChange(false); // 親のダイアログも閉じる
  };

  const onCopy = (id: string) => {
    handleCopy(id);
    setTitleDialogOpen(false); // 自身のダイアログを閉じる
    onOpenChange(false); // 親のダイアログも閉じる
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>︙</DialogTrigger>

      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-xl px-3 flex flex-col items-center justify-cneter w-2/3">
        <EditListTitleDialog
          open={titleDialogOpen}
          onOpenChange={setTitleDialogOpen}
          initialTitle={checkList.title}
          onSubmit={onSubmit}
        />
        <CopyListDialog
          open={copyDialogOpen}
          onOpenChange={setCopyDialogOpen}
          id={checkList.id}
          onCopy={onCopy}
          list_name={checkList.title}
        />
        <CheckDeleteItemDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          id={checkList.id}
          onDelete={onDelete}
          list_name={checkList.title}
        />
      </DialogContent>
    </Dialog>
  );
};
