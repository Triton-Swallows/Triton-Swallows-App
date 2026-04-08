import { Knex } from "knex";
import { createCountryCheersRepository } from "./country_cheers.repository";
import { createCountryCheersService } from "./country_cheers.service";
import { createCountryCheersController } from "./country_cheers.controller";

function initCountryCheers(db: Knex) {
  const repository = createCountryCheersRepository(db);
  const service = createCountryCheersService(repository);
  const controller = createCountryCheersController(service);

  return controller;
}

export { initCountryCheers };
