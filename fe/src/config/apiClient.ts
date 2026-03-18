import axios from "axios";
import { auth } from "./firebase";

/**
 * Firebase JWT認証トークンを自動的に付与するaxiosインスタンス
 *
 * フロー：
 * 1. ログイン時にFirebaseサーバーが秘密鍵でJWTを署名・発行
 * 2. JWTはlocalStorageに保存される
 * 3. リクエスト時にlocalStorageからJWTを取得
 * 4. AuthorizationヘッダーにBearerトークンとして付与
 * 5. サーバー側は公開鍵でJWTの署名を検証してuid/emailを抽出できる
 */

// axiosインスタンス作成
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors: 全てのリクエストに自動でJWTを付与
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
