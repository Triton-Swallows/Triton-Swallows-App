import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  onDelete: (title: string) => void;
  icon?: boolean;
  item_name?: string;
  list_name?: string;
};

export const CheckDeleteItemDialog = ({
  open,
  onOpenChange,
  id,
  onDelete,
  icon,
  item_name,
  list_name,
}: Props) => {
  const handleConfirm = () => {
    onDelete(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {icon ? (
        <DialogTrigger>
          <RiDeleteBinLine />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="bg-[#AF301F] text-[#FAF6F0] rounded py-[5px] px-[40px] w-3/4">
          削除
        </DialogTrigger>
      )}

      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-xl px-3 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="my-[20px] text-[14px]">
            この「{item_name || list_name}」を削除してもよろしいですか？
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Button
            className="flex items-center bg-[#D98364] text-[#FAF6F0]"
            onClick={handleConfirm}
          >
            はい
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#00588C] text-white"
          >
            キャンセル
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
