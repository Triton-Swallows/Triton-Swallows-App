const { createLikeController } = require("./like.controller");
const { createLikeRepository } = require("./like.repository");
const { createLikeService } = require("./like.service");

function initLike(knex) {
  const repository = createLikeRepository(knex);
  const service = createLikeService(repository);
  const controller = createLikeController(service);

  return controller;
}

module.exports = { initLike };
