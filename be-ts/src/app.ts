import express, { Application, Request, Response } from "express";
import db from "./knex";
import path from "path";
import fs from "fs";
import { initReview } from "./modules/review";
import { createReviewRouter } from "./routes/review";
import { initLike } from "./modules/like";
import { createLikeRouter } from "./routes/like";
import { initSummaryReview } from "./modules/reviewSummary";
import { createReviewSummaryRouter } from "./routes/reviewSummary";
import { initUser } from "./modules/user";
import { createUserRouter } from "./routes/user";
import { createThumbnailRouter } from "./routes/thumbnail";
import { initCountry } from "./modules/country";
import { createCountryRouter } from "./routes/country";
import { initCountryCheers } from "./modules/country_cheers";
import { createCountryCheersRouter } from "./routes/country_cheer";

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
    const filePath = path.join(__dirname, "../public/index.html");
    const html = fs.readFileSync(filePath, "utf-8");
    const ogTags = `
    <meta property="og:title" content="Triton Trip - 旅行情報アプリ" />
    <meta property="og:description" content="Triton Trip - 旅行情報アプリ" />
    <meta property="og:image" content="https://triton-travel-c2977645d3f8.herokuapp.com/thumbnail.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://triton-travel-c2977645d3f8.herokuapp.com/" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://triton-travel-c2977645d3f8.herokuapp.com/thumbnail.png" />`;
    res.send(html.replace("</head>", `${ogTags}\n  </head>`));
  });

  const reviewController = initReview(db);
  app.use("/api", createReviewRouter(reviewController));

  const likeController = initLike(db);
  app.use("/api", createLikeRouter(likeController));

  app.use("/api", createThumbnailRouter());

  const countryController = initCountry(db);
  app.use("/api", createCountryRouter(countryController));

  const CountryCheersController = initCountryCheers(db);
  app.use("/api", createCountryCheersRouter(CountryCheersController));

  return app;
}
