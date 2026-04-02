import { useMemo, useState, type FormEvent } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const systemPrompt = `
    システムプロンプト：以降の会話では、あなたは旅行会社および旅行専門家として初心者に簡潔にアドバイスしてください
    原則1~3文で答えること
    応答はプレーンテキストのみで返し、Markdown、箇条書き記号、見出し、強調記号、コードブロック、リンク記法は使わないこと`;

  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">専門家</DialogTitle>
          <DialogDescription className="text-[14px]">
            ここに説明文を入れられます
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-80 space-y-3 overflow-y-auto rounded-md border p-4">
          {chatHistory.length === 0 ? (
            <div className="text-sm text-slate-500">
              ここにチャット履歴が表示されます
            </div>
          ) : (
            chatHistory.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={item.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={
                    item.role === "user"
                      ? "inline-block rounded-lg bg-[#00588C] px-3 py-2 text-sm text-white"
                      : "inline-block rounded-lg bg-slate-100 px-3 py-2 text-sm"
                  }
                >
                  {item.text}
                </div>
              </div>
            ))
          )}
          {isLoading && <div className="text-sm">生成中...</div>}
        </div>
        <div>
          <form onSubmit={onSubmit} className="flex w-full gap-3">
            <input
              type="text"
              value={message}
              placeholder="テキストを入力して送信"
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border p-2"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="shrink-0 rounded-xl bg-[#00588C] px-4 py-2 text-white disabled:opacity-50"
            >
              送信
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
