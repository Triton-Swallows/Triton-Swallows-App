import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("countries").del();
  await knex("countries").insert([
    {
      name: "アメリカ（米国）",
      name_en: "usa",
      available: "true",
    },
    {
      name: "韓国",
      name_en: "korea",
      available: "false",
    },
    {
      name: "台湾",
      name_en: "taiwan",
      available: "false",
    },
    {
      name: "タイ",
      name_en: "thailand",
      available: "false",
    },
    {
      name: "ベトナム",
      name_en: "vietnam",
      available: "false",
    },
  ]);
}
