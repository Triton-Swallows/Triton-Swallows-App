import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RiUser3Fill, RiAddBoxLine } from "react-icons/ri";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  reviewComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const ReviewPostDialog = ({
  open,
  onOpenChange,
  disabled,
  reviewComment,
  onCommentChange,
  onSubmit,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex justify-center fixed bottom-0 left-0 right-0 z-10 py-3 bg-white">
        <DialogTrigger
          disabled={disabled}
          className="bg-[#00588C] rounded-xl text-[#FAF6F0] text-[14px] py-[8px] px-[48px] flex items-center gap-1"
        >
          投稿する
          <RiAddBoxLine className="text-[24px]" />
        </DialogTrigger>
      </div>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-none px-3">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <RiUser3Fill />
              <span>User_Name</span>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 items-end">
          <textarea
            className="w-full border border-[#D4D4D4] p-2 resize-none h-28 text-sm bg-white"
            placeholder="ここにコメントを書いてください"
            value={reviewComment}
            onChange={(e) => onCommentChange(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-[#00588C] rounded-sl text-[#FAF6F0] text-[12px] py-4 px-4"
          >
            comment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
