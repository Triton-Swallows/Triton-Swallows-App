import type { FormEvent } from "react";
import { useState } from "react";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "./ContactDialog";
import { RequireLoginDialog } from "./requireLoginDialog";

export const ContactRequestButton = () => {
  const { loginUser, loading } = AuthContextConsumer();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactTarget, setContactTarget] = useState("");
  const [contactDescription, setContactDescription] = useState("");
  const [contactOthers, setContactOthers] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [requireLogindialogOpen, setRequireLoginDialogOpen] =
    useState<boolean>(false);

  const handleContactDialogOpenChange = (open: boolean) => {
    if (!loginUser) {
      setRequireLoginDialogOpen(true);
      return;
    }
    setIsContactDialogOpen(open);
    if (open) {
      setContactStatus(null); // 前回の失敗/成功メッセージを消す
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loginUser || loading || isSubmittingContact) {
      return;
    }

    try {
      setIsSubmittingContact(true);
      await apiClient.post("/contacts", {
        target: contactTarget,
        description: contactDescription,
        others: contactOthers,
      });
      setContactStatus({
        type: "success",
        message: "変更申請を送信しました。情報提供ありがとうございます。",
      });
      setIsContactDialogOpen(false);
      setContactTarget("");
      setContactDescription("");
      setContactOthers("");
    } catch (error) {
      console.error("変更申請の送信に失敗しました", error);
      setContactStatus({
        type: "error",
        message: "変更申請の送信に失敗しました。再度お試しください。",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="flex justify-center mb-3">
      <Button
        className="bg-[#00588C] rounded-xl text-[#FAF6F0] text-[14px] py-[8px] px-[16px] w-[185px] h-[36px]"
        disabled={loading || isSubmittingContact}
        onClick={() => handleContactDialogOpenChange(true)}
      >
        情報変更を依頼する
      </Button>
      <ContactDialog
        open={isContactDialogOpen}
        onOpenChange={handleContactDialogOpenChange}
        disabled={!loginUser || loading || isSubmittingContact}
        target={contactTarget}
        description={contactDescription}
        others={contactOthers}
        statusType={contactStatus?.type}
        statusMessage={isContactDialogOpen ? contactStatus?.message : undefined}
        onTargetChange={setContactTarget}
        onDescriptionChange={setContactDescription}
        onOthersChange={setContactOthers}
        onSubmit={handleContactSubmit}
      />
      <RequireLoginDialog
        open={requireLogindialogOpen}
        onOpenChange={setRequireLoginDialogOpen}
        redirectPath={location.pathname}
      />
    </div>
  );
};
