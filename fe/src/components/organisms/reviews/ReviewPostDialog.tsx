import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import defautlIcon from "./../../../assets/UserIcon.png";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  reviewComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  user_name: string | undefined;
  user_icon: string | undefined;
};

export const ReviewPostDialog = ({
  open,
  onOpenChange,
  disabled,
  reviewComment,
  onCommentChange,
  onSubmit,
  user_name,
  user_icon,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex fixed bottom-[65px] justify-center left-0 right-0 z-10 py-3">
        <DialogTrigger
          disabled={disabled}
          className="bg-white rounded-2xl text-[#002B45] text-[14px] py-[8px] px-[10px] flex items-center gap-1 shadow-lg"
          onClick={() => {
            if (!open) {
              onOpenChange(true);
            }
          }}
        >
          ＋投稿する
        </DialogTrigger>
      </div>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-none px-3">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <img
                src={user_icon || defautlIcon}
                className="w-[40px] h-[40px] rounded-full border border-white "
              />
              <p className="text-[12px]">{user_name}</p>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 items-end">
          <Textarea
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
