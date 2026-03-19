const admin = require("firebase-admin");

// 本番環境: FIREBASE_SERVICE_ACCOUNT 環境変数（JSON文字列）から読み込む
// 開発環境: ローカルのJSONファイルから読み込む
const serviceAccount =
  process.env.NODE_ENV === "production"
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require("./triton-travel-be128-firebase-adminsdk-fbsvc-3a00e95aef.json");

// firebaseAdmin SDK 初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = { auth };
