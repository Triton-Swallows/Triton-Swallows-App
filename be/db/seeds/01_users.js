/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
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
  ]);
};
