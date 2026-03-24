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
    },
    {
      user_id: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      review: "302番道路  19時以降は危険",
      country_name: "usa",
    },
    {
      user_id: "tsJF90ELf6YFtJuc9ac247khhr02",
      review: "解熱剤なら持って行けた",
      country_name: "usa",
    },
    {
      user_id: "tsJF90ELf6YFtJuc9ac247khhr02",
      review: "4番目のコメントです。",
      country_name: "usa",
    },
    {
      user_id: "5A2LwTI4C3WMzWLOi80HoY6oyQB2",
      review: "5番目のコメントです",
      country_name: "usa",
    },
  ]);
};
