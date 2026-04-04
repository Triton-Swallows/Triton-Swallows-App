import { useState } from "react";
import type { CheckLists } from "@/components/pages/PackingCheckList";
import { EditListDialog } from "../dialogs/EditListDialog";

type Props = {
  checkList: CheckLists;
  handleEdit: (id: string, title: string) => void;
};

export const ListCard: React.FC<Props> = ({ checkList, handleEdit }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between border bg-[#A8C9DE] my-1">
      <p>{checkList.title}</p>
      <div className="flex items-center gap-6">
        <button
          className="flex items-center"
          onClick={() => handleEdit(checkList.id, checkList.title)}
        >
          編集テスト
        </button>
        <EditListDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          checkList={checkList}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};
