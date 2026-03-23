import { GoogleGenAI } from "@google/genai";
import { useState, useMemo } from "react";

// APIキーの管理（実際には.envファイルなどで管理してください）
export const Gemini = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const chat = useMemo(() => {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai.chats.create({
      model: "gemini-2.5-flash",
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });
  }, [API_KEY]);

  async function main() {
    const response = await chat.sendMessage({
      message: message,
    });
    console.log("response:", response);
    return response.text ?? "";
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await main();
    setMessage("");
    setResponse(res);
  };

  return (
    <>
      <h1>Gminiのテスト</h1>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">送る</button>
      </form>
      {!response ? <div>レスポンス無し</div> : <div>{response}</div>}
    </>
  );
};

// interface Message {
//   role: "user" | "model";
//   text: string;
// }

// export const Gemini: React.FC = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage: Message = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // モデルの初期化（gemini-1.5-flashは高速で軽量です）
//       const model = genAI.models.generateContent({
//         model: "gemini-3-flash-preview"
//       });

//       // 履歴を含めたチャットセッションの開始
//       const chat = model.startChat({
//         history: messages.map((m) => ({
//           role: m.role,
//           parts: [{ text: m.text }],
//         })),
//       });

//       const result = await chat.sendMessage(input);
//       const response = await result.response;
//       const modelMessage: Message = { role: "model", text: response.text() };

//       setMessages((prev) => [...prev, modelMessage]);
//     } catch (error) {
//       console.error("Gemini API Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "model", text: "エラーが発生しました。" },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[500px] w-full max-w-md border rounded-lg overflow-hidden bg-white">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[80%] p-3 rounded-lg ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="text-gray-400 text-sm">Geminiが思考中...</div>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="メッセージを入力..."
//           className="flex-1 border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
//         >
//           送信
//         </button>
//       </form>
//     </div>
//   );
// };
