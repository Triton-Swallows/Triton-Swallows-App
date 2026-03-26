import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from "firebase/app";
import { HeaderLayout } from "../templetes/HeaderLayout";

export function SignUpPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithGoogle } = AuthContextConsumer();
  const navigate = useNavigate();

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>,
  // ): Promise<void> => {
  //   e.preventDefault();
  //   setError("");

  //   // バリデーション
  //   if (!email || !password) {
  //     setError("すべてのフィールドを入力してください");
  //     return;
  //   }

  //   if (password.length < 8) {
  //     setError("パスワードは8文字以上にしてください");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     await signUpWithEmail(email, password);
  //     // 登録成功 → トップページへ
  //     navigate("/");
  //   } catch (err: unknown) {
  //     if (err instanceof FirebaseError) {
  //       console.error("Sign up error:", err);
  //       // firebaseのエラーメッセージを日本語にする
  //       if (err.code === "auth/email-already-in-use") {
  //         setError("このメールアドレスは既に使用されています");
  //       } else if (err.code === "auth/weak-password") {
  //         setError("パスワードが弱すぎます");
  //       } else if (err.code === "auth/invalid-email") {
  //         setError("無効なメールアドレスです");
  //       } else {
  //         setError(err.message);
  //       }
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGoogleSignUp = async (): Promise<void> => {
    setError("");
    setLoading(true);
    try {
      await signUpWithGoogle();
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        console.error("Google signup error:", err);
        if (
          err.code === "auth/email-already-in-use" ||
          err.message.includes("already in use")
        ) {
          setError("このメールアドレスは既に使用されています");
        } else {
          setError(err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderLayout>
      <div className="w-full max-w-md mx-auto mt-2">
        <h2 className="mb-10 text-center text-xl text-[#002B45] font-bold">
          新規登録
        </h2>
        {error && (
          <div className="bg-red-500 text-white text-sm px-4 py-3 rounded-lg mb-4 font-semibold">
            {error}
          </div>
        )}
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="8文字以上"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gray-800 text-white text-sm font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "登録中..." : "登録"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs text-gray-400">または</span>
          <hr className="flex-1 border-gray-200" />
        </div> */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            type="button"
            className="flex items-center justify-center rounded-xl text-[14px] border border-[#00588C] px-5 py-1 font-medium text-[#00588C] transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
          >
            <FcGoogle
              style={{
                marginRight: "8px",
                verticalAlign: "middle",
                fontSize: "30px",
              }}
            />
            Googleで登録＆ログイン
          </button>
        </div>

        {/* <div className="text-center mt-5">
          <p className="text-sm text-gray-500">
            既にアカウントをお持ちですか？{" "}
            <Link
              to="/login"
              className="text-gray-800 font-semibold underline hover:text-gray-600"
            >
              ログイン
            </Link>
          </p>
        </div> */}
      </div>
    </HeaderLayout>
  );
}
