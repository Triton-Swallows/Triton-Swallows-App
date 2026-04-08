import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";
import { LikeController } from "../modules/like/like.controller";

function createLikeRouter(likeController: LikeController) {
  const router = express.Router();

  // reviewにいいねを投稿
  router.post("/likes/", verifyToken, likeController.post);

  // reviewのいいねを削除
  router.delete("/likes/:reviewId", verifyToken, likeController.del);

  return router;
}

export { createLikeRouter };
