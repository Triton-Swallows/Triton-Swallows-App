import { ReviewController } from "../modules/review/review.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";

// const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewRouter(reviewController: ReviewController) {
  const router = express.Router();

  // 口コミを全件取得
  router.get("/reviews", verifyToken, reviewController.getAll);

  // ユーザーごとのポイントを全件取得
  router.get(
    "/reviews/all_users_points",
    verifyToken,
    reviewController.getAllUsersPoints,
  );

  // ログインユーザーのポイントを取得
  router.get("/reviews/points", verifyToken, reviewController.getPoints);

  // 国ごとの口コミを全権取得
  router.get(
    "/reviews/:countryName",
    verifyToken,
    reviewController.getByCountry,
  );

  // 国ごとの口コミを全権取得（非ログイン時）
  router.get("/guest/reviews/:countryName", reviewController.getByCountryGuest);

  // 口コミを投稿
  router.post("/reviews/:countryName", verifyToken, reviewController.post);

  return router;
}

export { createReviewRouter };
