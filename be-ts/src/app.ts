import express, { Application, Request, Response } from "express";
import db from "./knex";
import path from "path";
import { initReview } from "./modules/review";
import { createReviewRouter } from "./routes/review";

import { initSummaryReview } from "./modules/reviewSummary";
import { createReviewSummaryRouter } from "./routes/reviewSummary";
import { initUser } from "./modules/user";
import { createUserRouter } from "./routes/user";

export function buildApp(): Application {
  const app: Application = express();

  app.use(express.json());

  /* staticファイルの位置を指定 */
  app.use("/", express.static(path.join(__dirname, "../public")));

  const userController = initUser(db);
  app.use("/api", createUserRouter(userController));

  const reviewSummaryController = initSummaryReview(db);
  app.use("/api", createReviewSummaryRouter(reviewSummaryController));

  // SPAフォールバック: すべてのAPI以外のルートをindex.htmlに
  app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  const reviewController = initReview(db);
  app.use("/api", createReviewRouter(reviewController));

  return app;
}
