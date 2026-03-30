import { Knex } from "knex";

import { createReviewRepository } from "./review.repository";
import { createReviewService } from "./review.service";
import { createReviewController } from "./review.controller";

function initReview(db: Knex) {
  const repository = createReviewRepository(db);
  const service = createReviewService(repository);
  const controller = createReviewController(service);

  return controller;
}

export { initReview };
