const express = require("express");
const knex = require("./knex");
const path = require("path");

const { initUser } = require("./modules/user/index");
const { createUserRouter } = require("./routes/user");
const { initReview } = require("./modules/review");
const { createReviewRouter } = require("./routes/review");
const { createLikeRouter } = require("./routes/like");
const { initLike } = require("./modules/like");

function buildApp() {
  const app = express();

  app.use(express.json());

  /* staticファイルの位置を指定 */
  app.use("/", express.static(path.join(__dirname, "../public")));

  const userController = initUser(knex);
  app.use("/api", createUserRouter(userController));

  const reviewController = initReview(knex);
  app.use("/api", createReviewRouter(reviewController));

  const likeController = initLike(knex);
  app.use("/api", createLikeRouter(likeController));

  // SPAフォールバック: すべてのAPI以外のルートをindex.htmlに
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  return app;
}

module.exports = { buildApp };
