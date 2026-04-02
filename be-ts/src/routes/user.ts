import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { UserController } from "../modules/user/user.controller";

function createUserRouter(userController: UserController) {
  const router = express.Router();

  // 認証ユーザーの情報取得
  router.get("/auth/me", verifyToken, userController.getMe);

  // ユーザー登録/更新
  router.post("/users", verifyToken, userController.upsert);

  // 自分のユーザー情報を取得
  router.get("/users/me", verifyToken, userController.getMyInfo);

  // 自分のユーザー情報を更新
  router.patch("/users", verifyToken, userController.editMyInfo);

  return router;
}

export { createUserRouter };
