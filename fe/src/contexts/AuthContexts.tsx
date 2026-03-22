import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth, googleProvider } from "../config/firebase";
import apiClient from "../config/apiClient";
import type { User, UserCredential } from "firebase/auth";

// 独自の型を定義
interface AuthContextType {
  loginUser: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<User>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  signUpWithGoogle: () => Promise<User>;
  signUpWithEmail: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

// Context生成(ログインに関する情報を管理)
const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  // ログインユーザ
  const [loginUser, setLoginUser] = useState<User | null>(null);
  // 認証状態の初期化中フラグ
  const [loading, setLoading] = useState<boolean>(true);

  // 起動時ログイン処理(既にログインしてる場合, ユーザ設定)
  useEffect(() => {
    // auth初期化時にログインユーザ設定
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setLoginUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Googleログイン式（DBにも自動登録）
  const loginWithGoogle = async (): Promise<User> => {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    setLoginUser(result.user);

    try {
      // BEにユーザ情報を保存（upsert）
      // 既存なら、サーバ側でupsertはせず、uidに紐づくuser情報を返す
      await apiClient.post("/users", {
        uid: result.user.uid,
        email: result.user.email,
      });
    } catch (error) {
      // DB保存失敗時の処理
      // 新規ユーザーの場合のみFirebaseユーザーを削除してロールバック
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        await result.user.delete();
        setLoginUser(null);
      }
      throw new Error("ユーザー情報の保存に失敗しました");
    }

    return result.user;
  };

  // メール/パスワードログイン（既存ユーザー）
  const loginWithEmail = async (
    email: string,
    password: string,
  ): Promise<User> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setLoginUser(result.user);
    return result.user;
  };

  // Google登録処理
  // loginWithGoogleでは既存か新規の検証をサーバ側で行い、新規なら登録する処理を行っているので、
  // signUpWithGoogleでもloginWithGoogleを呼べばよい
  // 登録がすんだら、user情報が返ってくる
  const signUpWithGoogle = async (): Promise<User> => {
    return await loginWithGoogle();
  };

  // メール/パスワード登録処理
  const signUpWithEmail = async (
    email: string,
    password: string,
  ): Promise<User> => {
    // 新規作成
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setLoginUser(result.user);

    try {
      // BEにユーザー情報を保存
      await apiClient.post("/users", {
        uid: result.user.uid,
        email: result.user.email,
      });
    } catch (error) {
      // DB保存失敗 → Firebaseユーザーを削除してロールバック
      await result.user.delete();
      setLoginUser(null);
      throw new Error("ユーザー登録に失敗しました");
    }

    return result.user;
  };

  // ログアウト処理
  const logout = async (): Promise<void> => {
    await signOut(auth);
    setLoginUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        loading,
        loginWithGoogle,
        loginWithEmail,
        signUpWithGoogle,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = (): AuthContextType => {
  const context = useContext(AuthContext);
  // nullガード
  if (!context) throw new Error("AuthContextProviderの外で使われています");
  return context;
};
