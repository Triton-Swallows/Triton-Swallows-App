import { useState } from "react";
import type { FormEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const INFERENCE_URL = import.meta.env.VITE_INFERENCE_URL;
const INFERENCE_KEY = import.meta.env.VITE_INFERENCE_KEY;
const MODEL_ID = import.meta.env.VITE_INFERENCE_MODEL_ID || "claude-3-haiku";

export const HerokuAIChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${INFERENCE_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${INFERENCE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL_ID,
          messages: nextMessages,
          max_tokens: 1024,
        }),
      });

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content ?? "エラー";
      setMessages([...nextMessages, { role: "assistant", content }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "エラーが発生しました" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <div
        style={{
          border: "1px solid #ccc",
          height: 400,
          overflowY: "auto",
          padding: 8,
          marginBottom: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
            <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
          </div>
        ))}
        {isLoading && <div>生成中...</div>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 4 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ここに入力"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          送信
        </button>
      </form>
    </div>
  );
};
