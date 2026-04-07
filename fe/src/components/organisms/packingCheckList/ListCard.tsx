import { useState } from "react";
import type { CheckLists } from "@/components/pages/MyPackingList";
import { EditListDialog } from "../dialogs/EditListDialog";
import { useNavigate } from "react-router-dom";

type Props = {
  checkList: CheckLists;
  handleEdit: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
  handleCopy: (id: string) => void;
};

const parseDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
};

const parseHashtag = (hashtag: string) => {
  if (!hashtag) return;
  const hashtagArr = hashtag.split(" ");
  return hashtagArr;
};

export const ListCard: React.FC<Props> = ({
  checkList,
  handleEdit,
  handleDelete,
  handleCopy,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/my-packing-list/${checkList.id}/items`, {
      state: { title: checkList.title },
    });
  };

  const arr = parseHashtag(checkList.hashtag);

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
            handleCopy={handleCopy}
          />
        </div>
      </div>
      <div className="flex justify-between w-full pb-[1px]"></div>
      <div className="flex items-end justify-between">
        {arr && (
          <div className="flex flex-col pb-[8px]">
            <p className="text-[14px] h-[20px]">{arr![0]}</p>
            <p className="text-[14px] h-[20px]">{arr![1]}</p>
          </div>
        )}

        <div className="ml-auto pb-[8px] font-medium items-end">
          更新日：
          {parseDate(checkList.updated_at) || parseDate(checkList.created_at)}
        </div>
      </div>
    </div>
  );
};
