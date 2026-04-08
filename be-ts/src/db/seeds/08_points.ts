import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("points").del();
  await knex("points").insert([
    {
      user_id: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      bonus_point: 200,
      consume_point: 0,
    },
    {
      user_id: "qulZYxjU5wfSjZXRc4gir5rxTV23",
      bonus_point: 0,
      consume_point: 0,
    },
    {
      user_id: "64wVqL7j7BgOKT4RvgtNMTokHwQ2",
      bonus_point: 0,
      consume_point: 0,
    },
  ]);
}
