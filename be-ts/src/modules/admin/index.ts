import { Knex } from "knex";
import { createAdminRepository } from "./admin.repository";
import { createAdminService } from "./admin.service";
import { createAdminController } from "./admin.controller";

function initAdmin(knex: Knex) {
  const repository = createAdminRepository(knex);
  const service = createAdminService(repository);
  const controller = createAdminController(service);

  return controller;
}

export { initAdmin };
