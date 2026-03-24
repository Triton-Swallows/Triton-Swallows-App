const express = require("express");
const { verifyToken } = require("../middlewares/auth.middlewares");

function createReviewRouter(reviewsController) {
  const router = express.Router();

  // 口コミをget
  router.get("/reviews", verifyToken, reviewsController.getAll);

  return router;
}

module.exports = { createReviewRouter };
