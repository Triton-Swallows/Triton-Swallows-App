import { useEffect, useState } from "react";
import type { Item } from "@/components/pages/MyPackingListItems";
import { EditItemDialog } from "../dialogs/EditItemDialog";

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
    if (s === 100) return "パッキング済";
    if (s === 50) return "準備済";
    return "未準備";
  };

  return (
    <div className="flex items-center justify-between border bg-[#99E8E2] my-1">
      <button
        className="bg-pink-500"
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
        />
      ) : (
        // 通常モード
        <p className="flex-1">{item.item}</p>
      )}
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
