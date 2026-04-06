import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("items").del();
  await knex("items").insert([
    {
      check_list_id: 1,
      item: "歯ブラシ",
      status: 0,
    },
    {
      check_list_id: 1,
      item: "タオル",
      status: 50,
    },
    {
      check_list_id: 1,
      item: "サウナハット",
      status: 100,
    },
    {
      check_list_id: 2,
      item: "帽子",
      status: 0,
    },
    {
      check_list_id: 2,
      item: "コンタクト",
      status: 50,
    },
    {
      check_list_id: 2,
      item: "サングラス",
      status: 100,
    },
  ]);
}
