import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("reviews").insert([
    {
      user_id: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      review: "アメリカめちゃ楽しかった",
      country_name: "usa",
      liked_count: 3,
      created_at: "2026-01-12 12:12:12",
    },
    {
      user_id: "qulZYxjU5wfSjZXRc4gir5rxTV23",
      review:
        "ビザ取得のサポート、1週間で取得！今月の初めにビザの申請をしましたが、驚くほど早く取得できました。旅行前に必要な手続きは計画的に行いましょう。",
      country_name: "usa",
      liked_count: 1,
      created_at: "2026-01-21 12:12:12",
    },
    {
      user_id: "qulZYxjU5wfSjZXRc4gir5rxTV23",
      review:
        "海外旅行保険、24時間以内に加入！最近、旅行保険に加入しましたが、手続きがスムーズで驚きました。安心して旅行に行くためには、事前準備が重要です。",
      country_name: "usa",
      liked_count: 0,
      created_at: "2026-02-11 12:12:12",
    },
    {
      user_id: "64wVqL7j7BgOKT4RvgtNMTokHwQ2",
      review: "日本に関する口コミです。",
      liked_count: 1,
      country_name: "japan",
    },
  ]);
}
