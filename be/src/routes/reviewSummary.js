const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewSummaryRouter(reviewsSummaryController) {
  const router = express.Router();

  // 口コミ要約を取得
  router.get(
    "/summaries/:countryName",
    verifyToken,
    reviewsSummaryController.getSummary,
  );

  // ログインしていない状態での口コミ要約取得
  router.get(
    "/guest/summaries/:countryName",
    reviewsSummaryController.getSummaryGuest,
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
