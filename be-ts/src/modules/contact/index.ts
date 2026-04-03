import { Knex } from "knex";
import { createContactRepository } from "./contact.repository";
import { createContactService } from "./contact.service";
import { createContactController } from "./contact.controller";

function initContact(knex: Knex) {
  const repository = createContactRepository(knex);
  const service = createContactService(repository);
  const controller = createContactController(service);

  return controller;
}

export { initContact };
