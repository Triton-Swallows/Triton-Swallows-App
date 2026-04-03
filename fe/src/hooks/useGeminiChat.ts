import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

const MAX_CHAT_SESSION = 3;

const getChatSessionStorageKey = (uid: string) => {
  return `gemini-chat-session-count:${uid}`;
};

export const useGeminiChat = () => {
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
    return storedCount ? Number(storedCount) : 0;
  };

  const incrementChatCount = (uid: string) => {
    const nextCount = getChatCount(uid) + 1;
    window.localStorage.setItem(
      getChatSessionStorageKey(uid),
      String(nextCount),
    );
  };

  const handleChatOpen = () => {
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

  return {
    handleChatOpen,
    isGeminiChatOpen,
    setIsGeminiChatOpen,
    loginDialogOpen,
    setLoginDialogOpen,
    chatLimitDialogOpen,
    setChatLimitDialogOpen,
    chatSessionKey,
    location,
  };
};
