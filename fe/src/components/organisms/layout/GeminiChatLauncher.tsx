import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FloatingScrollTopButton } from "@/components/organisms/layout/FloatingScrollTopButton";
import { GeminiChatDialog } from "@/components/organisms/dialogs/GeminiChatDialog";
import { ChatLimitDialog } from "@/components/organisms/dialogs/ChatLimitDialog";
import { RequireLoginDialog } from "@/components/organisms/dialogs/requireLoginDialog";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

const MAX_CHAT_SESSION = 3;

const getChatSessionStorageKey = (uid: string) => {
  return `gemini-chat-session-count:${uid}`;
};

export const GeminiChatLauncher = () => {
  const { loginUser } = AuthContextConsumer();
  const location = useLocation();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [chatLimitDialogOpen, setChatLimitDialogOpen] = useState(false);
  const [isGeminiChatOpen, setIsGeminiChatOpen] = useState(false);
  const [chatSessionKey, setChatSessionKey] = useState(0);

  const getChatCount = (uid: string) => {
    const storedCount = window.localStorage.getItem(
      getChatSessionStorageKey(uid),
    );

    if (!storedCount) {
      return 0;
    }

    return Number(storedCount);
  };

  const incrementChatCount = (uid: string) => {
    const nextCount = getChatCount(uid) + 1;
    window.localStorage.setItem(
      getChatSessionStorageKey(uid),
      String(nextCount),
    );
  };

  const handleClick = () => {
    if (!loginUser) {
      setLoginDialogOpen(true);
      return;
    }

    const chatCount = getChatCount(loginUser.uid);

    if (chatCount >= MAX_CHAT_SESSION) {
      setChatLimitDialogOpen(true);
      return;
    }

    incrementChatCount(loginUser.uid);
    setChatSessionKey((prev) => prev + 1);
    setIsGeminiChatOpen(true);
  };

  return (
    <>
      <FloatingScrollTopButton onClick={handleClick} />
      {isGeminiChatOpen && (
        <GeminiChatDialog
          key={chatSessionKey}
          open={isGeminiChatOpen}
          onOpenChange={setIsGeminiChatOpen}
        />
      )}
      <RequireLoginDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
        redirectPath={location.pathname}
      />
      <ChatLimitDialog
        open={chatLimitDialogOpen}
        onOpenChange={setChatLimitDialogOpen}
      />
    </>
  );
};
