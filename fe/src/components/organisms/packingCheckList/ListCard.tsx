import { useState } from "react";
import type { CheckLists } from "@/components/pages/MyPackingList";
import { EditListDialog } from "../dialogs/EditListDialog";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/my-packing-list/${checkList.id}/items`, {
      state: { title: checkList.title },
    });
  };

  return (
    <div
      className="flex flex-col justify-between rounded-xl bg-[#99E8E2] my-[8px] px-[10px] w-full h-[90px] shadow text-[#15544E]"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center w-ful pt-[8px] font-bold text-[24px]">
        <div className="flex items-center gap-[8px]">
          <p>{checkList.title}</p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <EditListDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            checkList={checkList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <div className="flex justify-between w-full pb-[8px]"></div>
      <div className="pb-[8px] font-medium">
        更新日：{checkList.updated_st || checkList.created_at}
      </div>
    </div>
  );
};
