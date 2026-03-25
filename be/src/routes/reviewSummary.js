const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewSummaryRouter(reviewsSummaryController) {
  const router = express.Router();

  //  TODO: verify tokenを追加
  // 口コミを全件取得
  router.get(
    "/summaries/:countryName",
    verifyToken,
    reviewsSummaryController.getSummary,
  );

  router.post("/summary_likes", verifyToken, reviewsSummaryController.postLike);

  router.delete(
    "/summary_likes/:summary_id",
    verifyToken,
    reviewsSummaryController.deleteLike,
  );

  return router;
}

module.exports = { createReviewSummaryRouter };
