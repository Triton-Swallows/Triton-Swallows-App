import { Knex } from "knex";

import { createCountryRepository } from "./country.repository";
import { createCountryService } from "./country.service";
import { createCountryController } from "./country.controller";

function initCountry(db: Knex) {
  const repository = createCountryRepository(db);
  const service = createCountryService(repository);
  const controller = createCountryController(service);

  return controller;
}

export { initCountry };
