const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewRouter(reviewsController) {
  const router = express.Router();

  //  TODO: verify tokenを追加
  // 口コミを全件取得
  router.get("/reviews", verifyToken, reviewsController.getAll);

  // // 国ごとの口コミを全権取得
  // router.get(
  //   "/reviews/:countryName", reviewsController.getByCountry,
  // );

  return router;
}

module.exports = { createReviewRouter };
