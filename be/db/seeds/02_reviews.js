/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("reviews").insert([
    {
      user_id: "tsJF90ELf6YFtJuc9ac247khhr02",
      review: "意外に蒸し暑い",
      country_name: "usa",
      created_at: "2026-03-12 12:12:12",
    },
    {
      user_id: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      review: "302番道路  19時以降は危険",
      country_name: "usa",
      created_at: "2026-02-24 12:12:12",
    },
    {
      user_id: "tsJF90ELf6YFtJuc9ac247khhr02",
      review: "解熱剤なら持って行けた",
      country_name: "usa",
      created_at: "2026-08-11 12:12:12",
    },
    {
      user_id: "tsJF90ELf6YFtJuc9ac247khhr02",
      review: "アメリカめちゃ楽しかった",
      country_name: "usa",
      created_at: "2026-01-12 12:12:12",
    },
    {
      user_id: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      review:
        "ビザ取得のサポート、1週間で取得！今月の初めにビザの申請をしましたが、驚くほど早く取得できました。旅行前に必要な手続きは計画的に行いましょう。",
      country_name: "usa",
      created_at: "2026-01-21 12:12:12",
    },
    {
      user_id: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      review:
        "海外旅行保険、24時間以内に加入！最近、旅行保険に加入しましたが、手続きがスムーズで驚きました。安心して旅行に行くためには、事前準備が重要です。",
      country_name: "usa",
      created_at: "2026-02-11 12:12:12",
    },
  ]);
};
