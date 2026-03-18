const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createUserRouter(userController) {
  const router = express.Router();

  // 認証ユーザーの情報取得
  router.get("/auth/me", verifyToken, userController.getMe);

  // ユーザー登録/更新
  router.post("/users", verifyToken, userController.upsert);

  return router;
}

module.exports = { createUserRouter };
