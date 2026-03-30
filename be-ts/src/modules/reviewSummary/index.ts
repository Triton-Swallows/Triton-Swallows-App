import { Knex } from "knex";
import { createReviewSummaryController } from "./reviewSummary.controller";
import { createReviewSummaryRepository } from "./reviewSummary.repository";
import { createReviewSummaryService } from "./reviewSummary.service";

function initSummaryReview(db: Knex) {
  const repository = createReviewSummaryRepository(db);
  const service = createReviewSummaryService(repository);
  const controller = createReviewSummaryController(service);

  return controller;
}

export { initSummaryReview };
