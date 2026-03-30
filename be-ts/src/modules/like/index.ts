import { Knex } from "knex";
import { createLikeRepository } from "./like.repository";
import { createLikeService } from "./like.service";
import { createLikeController } from "./like.controller";

function initLike(db: Knex) {
  const repository = createLikeRepository(db);
  const service = createLikeService(repository);
  const controller = createLikeController(service);

  return controller;
}

export { initLike };
