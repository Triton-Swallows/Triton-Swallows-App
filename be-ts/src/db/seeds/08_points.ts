import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("points").del();
  await knex("points").insert([
    {
      user_id: "tsJF90ELf6YFtJuc9ac247khhr02",
      bonus_point: 200,
      consume_point: 0,
    },
    {
      user_id: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      bonus_point: 0,
      consume_point: 0,
    },
    {
      user_id: "9HLcP3zl5ifAqniVlfz0Qp62xE63",
      bonus_point: 0,
      consume_point: 0,
    },
  ]);
}
