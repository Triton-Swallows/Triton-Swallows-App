import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("check_lists").del();
  await knex("check_lists").insert([
    {
      user_id: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      title: "必須用品",
    },
    {
      user_id: "qulZYxjU5wfSjZXRc4gir5rxTV23",
      title: "キャンプ用",
    },
    {
      user_id: "64wVqL7j7BgOKT4RvgtNMTokHwQ2",
      title: "アメリカ旅行用おススメ",
    },
  ]);
}
