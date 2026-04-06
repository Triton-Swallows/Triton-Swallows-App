import { Knex } from "knex";
import { createItemRepository } from "./items.repository";
import { createItemService } from "./items.service";
import { createItemController } from "./items.controller";

function initItems(knex: Knex) {
  const repository = createItemRepository(knex);
  const service = createItemService(repository);
  const controller = createItemController(service);

  return controller;
}

export { initItems };
