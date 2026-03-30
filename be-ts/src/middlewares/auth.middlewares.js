const { auth } = require("../config/firebase");

// firebaseのJWT検証
// ユーザログイン時に、firebaseがJWTを発行し、ブラウザlocalStorageに保存
// FE側のapiClient.jsでfetch時にJWTをここに送っている
// JWTはfirebaseの秘密鍵で署名されている(改ざん不能)
// firebase-adminにて、公開鍵で署名検証する処理が以下
/**
 * const decodedToken = await auth.verifyIdToken(token); の部分解説：
 * decodedTokenには以下のような情報が入っている
 * decodedToken = {
  uid: "abc123...",           // Firebase UID
  email: "user@example.com",  // メールアドレス
  exp: 1234567890,           // トークン期限
  ...
}
 * ので、next()以降req.user.uidでuidが、req.user.emailでemailが得られ、
 * db操作にて利用できる 
 */
async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "tokenがありません" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "不正なtokenです" });
  }
}

// ログイン必須にするミドルウェア
const requireLogin = verifyToken;

module.exports = {
  verifyToken,
  requireLogin,
};
