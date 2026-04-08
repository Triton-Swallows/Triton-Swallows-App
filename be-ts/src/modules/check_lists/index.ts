import { Knex } from "knex";
import { createCheckListRepository } from "./check_list.repository";
import { createCheckListService } from "./check_list.service";
import { createCheckListController } from "./check_list.controller";

function initCheckList(knex: Knex) {
  const repository = createCheckListRepository(knex);
  const service = createCheckListService(repository);
  const controller = createCheckListController(service);

  return controller;
}

export { initCheckList };
