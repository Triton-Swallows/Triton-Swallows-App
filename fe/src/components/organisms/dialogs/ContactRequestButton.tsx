import type { FormEvent } from "react";
import { useState } from "react";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "./ContactDialog";
import { RequireLoginDialog } from "./requireLoginDialog";
import { useLocation } from "react-router-dom";

type ContactRequestButtonProps = {
  buttonLabel?: string;
  bonusRate?: number;
};

export const ContactRequestButton = ({
  buttonLabel = "情報変更を依頼する",
  bonusRate = 1,
}: ContactRequestButtonProps) => {
  const { loginUser, loading } = AuthContextConsumer();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactDescription, setContactDescription] = useState("");
  const [contactOthers, setContactOthers] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactStatus, setContactStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [requireLogindialogOpen, setRequireLoginDialogOpen] =
    useState<boolean>(false);
  const location = useLocation();

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
        target: location.pathname,
        description: contactDescription,
        others: contactOthers,
        bonus_rate: bonusRate,
      });
      setContactStatus({
        type: "success",
        message: "変更申請を送信しました。情報提供ありがとうございます。",
      });
      setIsContactDialogOpen(false);
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
    <>
      <div className="fixed inset-x-0 bottom-[74px] z-40 flex justify-center px-4 md:bottom-[96px]">
        <Button
          className="h-[42px] min-w-[120px] rounded-xl bg-white px-[18px] py-[8px] text-[14px] text-[#002B45] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
          disabled={loading || isSubmittingContact}
          onClick={() => handleContactDialogOpenChange(true)}
        >
          {buttonLabel}
        </Button>
      </div>
      <ContactDialog
        open={isContactDialogOpen}
        onOpenChange={handleContactDialogOpenChange}
        disabled={!loginUser || loading || isSubmittingContact}
        description={contactDescription}
        others={contactOthers}
        statusType={contactStatus?.type}
        statusMessage={isContactDialogOpen ? contactStatus?.message : undefined}
        onDescriptionChange={setContactDescription}
        onOthersChange={setContactOthers}
        onSubmit={handleContactSubmit}
        location={location.pathname}
      />
      <RequireLoginDialog
        open={requireLogindialogOpen}
        onOpenChange={setRequireLoginDialogOpen}
        redirectPath={location.pathname}
      />
    </>
  );
};
