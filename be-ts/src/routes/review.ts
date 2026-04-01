import { ReviewController } from "../modules/review/review.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares";

// const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewRouter(reviewController: ReviewController) {
  const router = express.Router();

  // 口コミを全件取得
  router.get("/reviews", verifyToken, reviewController.getAll);

  // ユーザーごとのいいね数を全件取得
  router.get(
    "/reviews/like-counts",
    verifyToken,
    reviewController.getAllUsersLikeCounts,
  );

  // ログインユーザーのいいね数を取得
  router.get(
    "/reviews/like-counts/me",
    verifyToken,
    reviewController.getMyLikeCount,
  );

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
