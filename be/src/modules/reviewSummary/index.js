const { createReviewSummaryController } = require("./reviewSummary.controller");
const { createReviewSummaryRepository } = require("./reviewSummary.repository");
const { createReviewSummaryService } = require("./reviewSummary.service");

function initSummaryReview(knex) {
  const repository = createReviewSummaryRepository(knex);
  const service = createReviewSummaryService(repository);
  const controller = createReviewSummaryController(service);

  return controller;
}

module.exports = { initSummaryReview };
