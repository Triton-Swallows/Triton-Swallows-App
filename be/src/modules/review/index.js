const { createReviewController } = require("./review.controller");
const { createReviewRepository } = require("./review.repository");
const { createReviewService } = require("./review.service");

function initReview(knex) {
  const repository = createReviewRepository(knex);
  const service = createReviewService(repository);
  const controller = createReviewController(service);

  return controller;
}

module.exports = { initReview };
