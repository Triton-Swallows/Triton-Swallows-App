import { useState } from "react";
import type { CheckLists } from "@/components/pages/PackingCheckList";
import { EditListDialog } from "../dialogs/EditListDialog";

type Props = {
  checkList: CheckLists;
  handleEdit: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
};

export const ListCard: React.FC<Props> = ({
  checkList,
  handleEdit,
  handleDelete,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between border bg-[#99E8E2] my-1">
      <p>{checkList.title}</p>
      <div className="flex items-center gap-6">
        <EditListDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          checkList={checkList}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};
