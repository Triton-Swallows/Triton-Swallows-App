import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("summaries").del();
  await knex("summaries").insert([
    {
      summary: "意外に蒸し暑い",
      country_name: "usa",
      created_at: "2026-03-12 12:12:12",
    },
    {
      summary: "302番道路、19時以降は危険",
      country_name: "usa",
      created_at: "2026-02-24 12:12:12",
    },
    {
      summary: "解熱剤なら持って行けた",
      country_name: "usa",
      created_at: "2026-08-11 12:12:12",
    },
    {
      summary: "日本の要約口コミ：羽田空港の方が利便性が高い",
      country_name: "japan",
    },
  ]);
}
