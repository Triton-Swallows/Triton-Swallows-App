import { useEffect, useState } from "react";
import type { Item } from "@/components/pages/MyPackingListItems";
import { EditItemDialog } from "../dialogs/EditItemDialog";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import RiCheckboxBlankCircleHalf from "../../../assets/checkbox-half-circle-line.svg";

type Props = {
  item: Item;
  handleEdit: (id: string, title: string) => void;
  handleDelete: (id: string) => void;
  isEditing: boolean;
  onEditClick: () => void;
  onCancel: () => void;
  handleToggleStatus: (id: string, currentStatus: number) => void;
};

export const ItemCard: React.FC<Props> = ({
  item,
  handleEdit,
  handleDelete,
  isEditing,
  onEditClick,
  onCancel,
  handleToggleStatus,
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [tempName, setTempName] = useState(item.item);
  const [isComposing, setIsComposing] = useState(false);

  // 編集モードに入った時に現在の名前をセット
  useEffect(() => {
    if (isEditing) setTempName(item.item);
  }, [isEditing, item.item]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      handleEdit(item.id, tempName);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const getStatusLabel = (status: number) => {
    const s = Number(status);
    if (s === 100)
      return (
        <RiCheckboxBlankCircleFill
          className="w-[30px] h-[30px]"
          color="#002B45"
        />
      );
    if (s === 50)
      return (
        <img
          src={RiCheckboxBlankCircleHalf}
          alt="half checked"
          className="w-[30px] h-[30px] text-[#002B45]" // アイコンサイズに合わせる
        />
      );
    return (
      <RiCheckboxBlankCircleLine
        className="w-[30px] h-[30px]"
        color="#002B45"
      />
    );
  };

  return (
    <div className="flex items-center justify-between bg-[#EAFBFA] text-[#002B45] my-1 w-9/10 m-auto h-[32px]">
      <div className="flex  gap-[10px]">
        <button
          onClick={() => handleToggleStatus(item.id, Number(item.status))}
        >
          {getStatusLabel(Number(item.status))}
        </button>
        {isEditing ? (
          // 編集モード
          <input
            autoFocus
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onCancel}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="text-[16px] font-medium"
          />
        ) : (
          // 通常モード
          <p className="flex-1">{item.item}</p>
        )}
      </div>
      <EditItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={item}
        handleDelete={handleDelete}
        onStartNameEdit={() => {
          setDialogOpen(false); // ダイアログを閉じる
          onEditClick(); // カードを編集モードにする
        }}
      />
    </div>
  );
};
