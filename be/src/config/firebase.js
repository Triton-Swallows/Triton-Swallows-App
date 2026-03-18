const admin = require("firebase-admin");

// NODE_ENVによってシークレットのパスを切り替え
// herokuにはNODE_ENV=productionと記載すること
const serviceAccount =
  process.env.NODE_ENV === "production"
    ? require("/etc/secrets/triton-travel-be128-firebase-adminsdk-fbsvc-3a00e95aef.json")
    : require("./triton-travel-be128-firebase-adminsdk-fbsvc-3a00e95aef.json");

// firebaseAdmin SDK 初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = { auth };
