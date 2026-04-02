import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { AdminController } from "../modules/admin/admin.controller";

function createAdminRouter(adminController: AdminController) {
  const router = express.Router();

  // 認証ユーザーの情報取得
  router.get("/admin", verifyToken, adminController.getAllUserInfo);

  router.patch("/admin/points", verifyToken, adminController.editPoints);

  router.get("/admin/contacts", verifyToken, adminController.getContacts);

  return router;
}

export { createAdminRouter };
