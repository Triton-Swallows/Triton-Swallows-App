import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import { FcGoogle } from "react-icons/fc";
import { FirebaseError } from "firebase/app";
import { HeaderLayout } from "../templetes/HeaderLayout";

export function LoginPage() {
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { loginWithGoogle } = AuthContextConsumer();
  const navigate = useNavigate();

  // TODO: React.FormEventに非推奨マークがでている
  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>,
  // ): Promise<void> => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     await loginWithEmail(email, password);
  //     navigate("/");
  //   } catch (err: unknown) {
  //     console.error("Login error:", err);
  //     if (err instanceof FirebaseError) {
  //       if (err.code === "auth/invalid-credential") {
  //         setError("メールアドレスまたはパスワードが正しくありません");
  //       } else if (err.code === "auth/user-not-found") {
  //         setError("アカウントが存在しません");
  //       } else {
  //         setError(err.message);
  //       }
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGoogleLogin = async (): Promise<void> => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: unknown) {
      console.error("Google login error:", err);
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderLayout>
      <div className="mt-10 w-full max-w-md rounded-xl border bg-white p-8 shadow-sm mx-auto">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
          ログイン
        </h2>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
            {error}
          </div>
        )}
        {/* <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form> */}

        <div>
          {/* <hr className="mx-5" /> */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
          >
            <FcGoogle style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Googleでログイン
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-600">
          <p>
            アカウントをお持ちでないですか？{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </HeaderLayout>
  );
}
