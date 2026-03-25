const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createLikeRouter(likeController) {
  const router = express.Router();

  // reviewにいいねを投稿
  router.post("/likes/", verifyToken, likeController.post);

  // reviewのいいねを削除
  router.delete("/likes/:reviewId", verifyToken, likeController.del);

  return router;
}

module.exports = { createLikeRouter };
