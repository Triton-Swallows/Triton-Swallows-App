const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewSummaryRouter(reviewsSummaryController) {
  const router = express.Router();

  //  TODO: verify tokenを追加
  // 口コミを全件取得
  router.get("/reviews/summary", verifyToken, reviewsSummaryController.getAll);

  return router;
}

module.exports = { createReviewSummaryRouter };
