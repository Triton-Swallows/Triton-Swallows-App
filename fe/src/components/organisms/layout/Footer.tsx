import { useNavigate, Link } from "react-router-dom";
import { RiHome3Line, RiChatAiLine, RiTodoLine } from "react-icons/ri";
import { useGeminiChat } from "@/hooks/useGeminiChat";
import { GeminiChatDialog } from "../dialogs/GeminiChatDialog";
import { ChatLimitDialog } from "../dialogs/ChatLimitDialog";
import { RequireLoginDialog } from "../dialogs/requireLoginDialog";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

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

  const { loginUser } = AuthContextConsumer();
  const navigate = useNavigate();

  const handleCheckListOpen = () => {
    if (!loginUser) {
      setLoginDialogOpen(true);
      return;
    }
    navigate("/my-packing-list");
  };

  return (
    <>
      <footer className="fixed bottom-[4px] left-1/2 -translate-x-1/2 z-20 backdrop-blur-md bg-white/50 text-[#00588C] py-4 shadow-lg h-[63px] w-[262px] md:w-[1200px] md:h-[80px] bottom-0 rounded-3xl">
        <div className="flex justify-around items-center px-4 h-full">
          <Link to="/" className=" hover:text-blue-100">
            <RiHome3Line className="w-[45px] h-[50px]" />
          </Link>

          <button
            onClick={handleCheckListOpen}
            className=" hover:text-blue-100"
          >
            <RiTodoLine className="w-[45px] h-[50px]" />
          </button>

          <button onClick={handleChatOpen} className=" hover:text-blue-100">
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
      />
      <ChatLimitDialog
        open={chatLimitDialogOpen}
        onOpenChange={setChatLimitDialogOpen}
      />
    </>
  );
};
