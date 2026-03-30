import { Knex } from "knex";
import { createUserRepository } from "./user.repository";
import { createUserService } from "./user.service";
import { createUserController } from "./user.controller";

function initUser(knex: Knex) {
  const repository = createUserRepository(knex);
  const service = createUserService(repository);
  const controller = createUserController(service);

  return controller;
}

export { initUser };
