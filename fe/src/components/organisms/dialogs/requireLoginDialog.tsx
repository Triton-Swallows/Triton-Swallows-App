import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RequireLoginDialog = ({ open, onOpenChange }: Props) => {
  const authContext = AuthContextConsumer();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSignUp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await authContext.signUpWithGoogle();
      onOpenChange(false);
    } catch (error) {
      console.error("Google signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#F1F5F9] ring-0 rounded-lg py-16">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-[#002B45]">
            ログインして続ける
          </DialogTitle>
          <DialogDescription className="text-center text-[14px] text-[#002B45]">
            ソーシャルアカウントでログイン・新規登録
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignUp}
            type="button"
            disabled={isSubmitting}
            className="flex items-center justify-center rounded-xl text-[14px] border border-[#00588C] px-5 py-1 font-medium text-[#00588C] transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FcGoogle
              style={{
                marginRight: "8px",
                verticalAlign: "middle",
                fontSize: "30px",
              }}
            />
            Googleで登録とログイン
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
