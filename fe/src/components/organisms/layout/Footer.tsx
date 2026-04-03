import { Link } from "react-router-dom";
import { RiHome3Line, RiChatAiLine, RiTodoLine } from "react-icons/ri";
import { useGeminiChat } from "@/hooks/useGeminiChat";
import { GeminiChatDialog } from "../dialogs/GeminiChatDialog";
import { ChatLimitDialog } from "../dialogs/ChatLimitDialog";
import { RequireLoginDialog } from "../dialogs/requireLoginDialog";

export const Footer = () => {
  const {
    handleChatOpen,
    isGeminiChatOpen,
    setIsGeminiChatOpen,
    loginDialogOpen,
    setLoginDialogOpen,
    chatLimitDialogOpen,
    setChatLimitDialogOpen,
    chatSessionKey,
    location,
  } = useGeminiChat();

  return (
    <>
      <footer className="fixed bottom-[4px] left-1/2 -translate-x-1/2 bg-white text-[#00588C] py-4 shadow-lg h-[63px] w-[262px] bottom-0 z-20 rounded-3xl">
        <div className="flex justify-around items-center px-4 h-full">
          <Link to="/" className="text-xl font-bold hover:text-blue-100">
            <RiHome3Line className="w-[45px] h-[50px]" />
          </Link>

          <Link to="TBD">
            <RiTodoLine className="w-[45px] h-[50px]" />
          </Link>

          <button onClick={handleChatOpen}>
            <RiChatAiLine className="w-[45px] h-[50px]" />
          </button>
        </div>
      </footer>

      {/* Gemini関連のダイアログ */}
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
