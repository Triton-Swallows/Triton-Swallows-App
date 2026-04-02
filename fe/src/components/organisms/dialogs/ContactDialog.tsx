import type { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
  description: string;
  others: string;
  statusType?: "success" | "error";
  statusMessage?: string;
  onDescriptionChange: (value: string) => void;
  onOthersChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  location: string;
};

export const ContactDialog = ({
  open,
  onOpenChange,
  disabled,
  description,
  others,
  statusType,
  statusMessage,
  onDescriptionChange,
  onOthersChange,
  onSubmit,
  location,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-none px-3">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <span>詳細情報の変更申請</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            送信時に登録されているメールアドレスが自動で送信されます。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 items-end">
          {statusMessage && (
            <div
              className={`w-full border p-3 ${
                statusType === "success"
                  ? "border-green-100 bg-green-50 text-green-700"
                  : "border-red-100 bg-red-50 text-red-600"
              }`}
            >
              {statusMessage}
            </div>
          )}

          <div className="w-full space-y-2">
            <p className="block font-medium">変更を申請するページ：</p>
            <div>{location}</div>
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="contact-description" className="block font-medium">
              変更すべき内容を教えてください。（必須）
            </label>
            <textarea
              id="contact-description"
              disabled={disabled}
              className="w-full border border-[#D4D4D4] p-2 resize-none h-28 bg-white"
              placeholder="変更したい内容を入力してください"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="contact-others" className="block font-medium">
              参照リンクがあれば記入してください。（任意）
            </label>
            <input
              id="contact-others"
              disabled={disabled}
              className="w-full border border-[#D4D4D4] p-2 bg-white"
              placeholder="https://example.com"
              value={others}
              onChange={(e) => onOthersChange(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={disabled || description === ""}
            className="bg-[#00588C] rounded-sl text-[#FAF6F0] text-[12px] py-4 px-4"
          >
            送信する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
