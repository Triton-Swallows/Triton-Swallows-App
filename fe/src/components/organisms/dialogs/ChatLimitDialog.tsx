import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ChatLimitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ChatLimitDialog = ({
  open,
  onOpenChange,
}: ChatLimitDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#002B45]">
            チャット上限に達しました
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            このアカウントでは新規チャットを20回まで開始できます。
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
