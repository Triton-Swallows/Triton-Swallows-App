import { Router } from "express";
import { ReviewSummaryController } from "../modules/reviewSummary/reviewSummary.controller";
import { verifyToken } from "../middlewares/auth.middlewares";

export function createReviewSummaryRouter(
  reviewsSummaryController: ReviewSummaryController,
) {
  const router = Router();

  router.get(
    "/summaries/:countryName",
    verifyToken,
    reviewsSummaryController.getSummary,
  );
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
