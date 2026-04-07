import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Item } from "@/components/pages/MyPackingListItems";
import { CheckDeleteItemDialog } from "./CheckDeleteItemDialog";
import { RiPencilLine } from "react-icons/ri";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
  handleDelete: (id: string) => void;
  onStartNameEdit: () => void;
};

export const EditItemDialog = ({
  item,
  handleDelete,
  onStartNameEdit,
}: Props) => {
  const [titleDialogOpen, setTitleDialogOpen] = useState<boolean>(false);

  const onDelete = (id: string) => {
    handleDelete(id);
    setTitleDialogOpen(false); // 自身のダイアログを閉じる
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={() => {
          onStartNameEdit(); // 親に通知してダイアログを閉じる
        }}
      >
        <RiPencilLine />
      </Button>
      <CheckDeleteItemDialog
        open={titleDialogOpen}
        onOpenChange={setTitleDialogOpen}
        id={item.id}
        onDelete={onDelete}
        icon
      />
    </div>
  );
};
