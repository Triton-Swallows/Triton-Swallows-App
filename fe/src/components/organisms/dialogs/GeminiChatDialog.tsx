import { useMemo, useState, type FormEvent } from "react";
import { GoogleGenAI } from "@google/genai";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { RiSendPlane2Line } from "react-icons/ri";
import GeminiChatIcon from "@/assets/TrimmedChatHeaderIcon.png";
import { Input } from "@/components/ui/input";
import ToriToriIcon from "@/assets/ToriLogo.svg";
import defaultUserIcon from "@/assets/UserIcon.png";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type GeminiChatDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

export const GeminiChatDialog = ({
  open,
  onOpenChange,
}: GeminiChatDialogProps) => {
  const { userInfo } = AuthContextConsumer();
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const systemPrompt = `
    システムプロンプト：以降の会話では、あなたは旅行会社および旅行専門家として初心者に簡潔にアドバイスしてください
    原則1~3文で答えること
    応答はプレーンテキストのみで返し、Markdown、箇条書き記号、見出し、強調記号、コードブロック、リンク記法は使わないこと`;

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userIconSrc = userInfo?.icon_url?.trim() || defaultUserIcon;

  const chat = useMemo(() => {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai.chats.create({
      model: "gemini-2.5-flash-lite",
      config: {
        maxOutputTokens: 200,
      },
      history: [
        {
          role: "user",
          parts: [
            {
              text: systemPrompt,
            },
          ],
        },
      ],
    });
  }, [API_KEY, open]);

  const geminiChat = async () => {
    const response = await chat.sendMessage({
      message: message,
    });
    return response.text ?? "";
  };

  const handleOpenChange = (nextOpen: boolean) => {
    // nextOpen: false => これから閉じるタイミング
    if (!nextOpen) {
      setMessage("");
      setChatHistory([]);
      setIsLoading(false);
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }
    setIsLoading(true);
    setChatHistory((prev) => [...prev, { role: "user", text: trimmedMessage }]);

    try {
      const res = await geminiChat();
      setChatHistory((prev) => [...prev, { role: "model", text: res }]);
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-[50vh] max-h-[50vh] flex-col overflow-hidden rounded-3xl border border-[#E5E5E5] bg-[#FAF6F0]">
        <DialogHeader className="items-center text-center">
          <div className="flex w-full justify-center mt-[-25px]">
            <div className="flex h-20 w-20 z-10 items-center justify-center">
              <img src={GeminiChatIcon} alt="Gemini chat icon" />
            </div>
          </div>
          <div className="h-px w-[240px] mt-[-25px] self-center bg-[#D4D4D4]" />
          <p className="text-[16px] text-[#002B45]">何をお手伝いしますか？</p>
        </DialogHeader>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-xl p-4">
          {chatHistory.length === 0 ? (
            <div className="text-sm text-slate-500"></div>
          ) : (
            chatHistory.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={
                  item.role === "user"
                    ? "flex items-end justify-end gap-2"
                    : "flex items-end justify-start gap-2"
                }
              >
                {item.role === "model" && (
                  <img
                    src={ToriToriIcon}
                    alt="ToriTori icon"
                    className="h-8 w-8 shrink-0 rounded"
                  />
                )}
                <div
                  className={
                    item.role === "user"
                      ? "inline-block max-w-[75%] rounded-lg bg-[#00588C] px-3 py-2 text-left text-sm text-white"
                      : "inline-block max-w-[75%] rounded-lg bg-slate-100 px-3 py-2 text-sm"
                  }
                >
                  {item.text}
                </div>
                {item.role === "user" && (
                  <img
                    src={userIconSrc}
                    alt="User icon"
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-end justify-start gap-2">
              <img
                src={ToriToriIcon}
                alt="ToriTori icon"
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              <div className="inline-block max-w-[75%] rounded-lg bg-slate-100 px-3 py-2 text-sm">
                生成中...
              </div>
            </div>
          )}
        </div>
        <div className="min-h-16 rounded-xl border border-[#E5E5E5] bg-white px-2 py-2">
          <form onSubmit={onSubmit} className="flex w-full gap-3">
            <Input
              id="gemini-chat-input"
              value={message}
              placeholder="メッセージを入力..."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border-transparent px-6 py-6 shadow-none focus-visible:border-transparent focus-visible:ring-0"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 w-12 shrink-0 items-center justify-center text-[#002B45] transition hover:bg-[#00466f] disabled:opacity-50"
            >
              <RiSendPlane2Line className="text-[24px]" />
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
