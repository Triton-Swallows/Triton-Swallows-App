import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("users").del();
  await knex("users").insert([
    {
      uid: "tsJF90ELf6YFtJuc9ac247khhr02",
      email: "natsumi.miyamoto2@gmail.com",
    },
    {
      uid: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      email: "jera.hq.devtr.mem090@outlook.jp",
    },
    {
      uid: "9HLcP3zl5ifAqniVlfz0Qp62xE63",
      email: "kei.ccbdev07@gmail.com",
    },
    {
      uid: "brDXtUpoT4dACsJkpmTO8XJeViz1",
      email: "test@gmail.com",
    },
    {
      uid: "3pOFAkW1glYHHO7Bx1ogMELFf5I2",
      email: "test2@gmail.com",
    },
  ]);
}
