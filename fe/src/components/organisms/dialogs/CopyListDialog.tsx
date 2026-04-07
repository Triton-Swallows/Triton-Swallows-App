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
  onCopy: (id: string) => void;
  icon?: boolean;
  item_name?: string;
  list_name?: string;
};

export const CopyListDialog = ({
  open,
  onOpenChange,
  id,
  onCopy,
  icon,
  list_name,
}: Props) => {
  const handleConfirm = () => {
    onCopy(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {icon ? (
        <DialogTrigger>
          <RiDeleteBinLine />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="bg-[#00588C] text-white rounded py-[5px] px-[40px] w-3/4">
          複製
        </DialogTrigger>
      )}

      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-xl px-3 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="my-[20px] text-[14px]">
            この「{list_name}」を複製してもよろしいですか？
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#00588C] text-white"
          >
            キャンセル
          </Button>
          <Button
            className="bg-[#2BA89D] text-white px-[30px]"
            onClick={handleConfirm}
          >
            はい
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
