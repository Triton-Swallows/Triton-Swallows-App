import { useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Router } from "@/router/Router";
import { FloatingScrollTopButton } from "@/components/organisms/layout/FloatingScrollTopButton";
import { GeminiChatDialog } from "@/components/organisms/dialogs/GeminiChatDialog";
import { ChatLimitDialog } from "@/components/organisms/dialogs/ChatLimitDialog";
import { RequireLoginDialog } from "@/components/organisms/dialogs/requireLoginDialog";
import {
  AuthContextConsumer,
  AuthContextProvider,
} from "@/contexts/AuthContexts";

// TODO: chatボタンを押すだけでカウント増えちゃう　submitされなかったら、count - 1する必要あり
// TODO: localStorageでの制限はユーザが直接書き換えられちゃうので、あんま意味ない
const MAX_CHAT_SESSION = 3;

const getChatSessionStorageKey = (uid: string) => {
  return `gemini-chat-session-count:${uid}`;
};

function AppContent() {
  const { loginUser } = AuthContextConsumer();
  const location = useLocation();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [chatLimitDialogOpen, setChatLimitDialogOpen] = useState(false);
  const [isGeminiChatOpen, setIsGeminiChatOpen] = useState(false);
  const [chatSessionKey, setChatSessionKey] = useState(0);

  // 今いる場所(path)が/以外のとき、geminiチャットボタン表示
  const showFloatingButton = location.pathname !== "/";

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
      <Router></Router>
      {showFloatingButton && <FloatingScrollTopButton onClick={handleClick} />}
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
}

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
