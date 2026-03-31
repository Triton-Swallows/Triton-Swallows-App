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
  app.use(
    "/",
    express.static(path.join(__dirname, "../public"), { index: false }),
  );

  const userController = initUser(db);
  app.use("/api", createUserRouter(userController));

  const reviewSummaryController = initSummaryReview(db);
  app.use("/api", createReviewSummaryRouter(reviewSummaryController));

  // SPAフォールバック: すべてのAPI以外のルートをindex.htmlに
  app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "../public/index.html");
    const html = fs.readFileSync(filePath, "utf-8");
    const protocol =
      (req.headers["x-forwarded-proto"] as string) || req.protocol;
    const host = req.get("host");
    const baseUrl = `${protocol}://${host}`;
    const ogTags = `
    <meta property="og:title" content="Triton Trip - 情報/口コミ一元管理アプリ" />
    <meta property="og:description" content="旅行者の口コミや情報提供をもとに、”企業が情報を精査”して情報を掲載しています。トリトントラベルでは、口コミや持ち物情報を一箇所に集約しており、ユーザーの手間を最小限にしています。持ち物確認、必要書類、口コミ確認、AI質問なんでもできます！" />
    <meta property="og:image" content="${baseUrl}/thumbnail.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${baseUrl}${req.originalUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${baseUrl}/thumbnail.png" />`;
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
