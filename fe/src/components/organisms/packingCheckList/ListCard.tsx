import { useState } from "react";
import type { CheckLists } from "@/components/pages/PackingCheckList";
import { EditListDialog } from "../dialogs/EditListDialog";
import { useNavigate } from "react-router-dom";

type Props = {
  checkList: CheckLists;
  handleEdit: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
};
// <Link to={`/packing-checklist/items/${checkList.id}`}>

export const ListCard: React.FC<Props> = ({
  checkList,
  handleEdit,
  handleDelete,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/packing-checklist/items/${checkList.id}`);
  };

  return (
    <div
      className="flex items-center justify-between border bg-[#99E8E2] my-1"
      onClick={handleCardClick}
    >
      <p>{checkList.title}</p>
      <div
        className="flex items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
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
