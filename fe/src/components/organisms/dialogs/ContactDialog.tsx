import type { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FloatImage from "./../../../assets/form_pic.png";

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
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-xl px-3 overflow-visible">
        <img
          src={FloatImage}
          alt="form-icon"
          className="mx-auto w-[98px] h-[98px] absolute top-[-70px] left-1/2 -translate-x-1/2"
        />
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2 justify-center text-[#002B45] text-[16px] font-bold pb-[10px]">
              <span>トリトリ - 詳細情報の変更・追加申請</span>
            </div>
          </DialogTitle>
          <DialogDescription className="flex justify-center text-[#002B45] text-[12px]">
            情報の正確性向上のため、修正にご協力ください。以下の項目への入力をお願いいたします。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-[10px]">
          {/* TODO：何これ？？ */}
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

          <FieldGroup className="border border-[#A5A5A5] px-[10px] py-[15px] rounded">
            {/* 申請対象ページ */}
            <FieldGroup>
              <FieldLabel className="text-[12px]">申請対象のページ:</FieldLabel>
              <p className="border-none text-[15px]">{location}</p>
            </FieldGroup>

            {/* 変更内容 */}
            <FieldGroup>
              <FieldLabel className="text-[12px]">
                変更・追加すべき内容を教えてください。
              </FieldLabel>
              <Textarea
                id="contact-description"
                rows={5}
                disabled={disabled}
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                required
                className="bg-white border-none text-[12px]"
              />
            </FieldGroup>

            {/* 参照リンクなど */}
            <FieldGroup>
              <FieldLabel className="text-[12px]">
                参照リンクがあれば記入してください。
              </FieldLabel>
              <Input
                id="contact-others"
                disabled={disabled}
                value={others}
                onChange={(e) => onOthersChange(e.target.value)}
                className="bg-white border-none text-[12px]"
              />
            </FieldGroup>
          </FieldGroup>

          {/* 送信ボタン */}
          <div className="flex justify-center mt-[10px]">
            <Button
              type="submit"
              disabled={disabled || description === ""}
              className={`rounded-sl text-[#FAF6F0] text-[12px] py-4 px-[30px] 
                ${disabled || description === "" ? "bg-gray-500" : "bg-[#00588C]"}`}
            >
              修正を依頼する
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
