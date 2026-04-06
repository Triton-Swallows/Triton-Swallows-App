import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("check_lists").del();
  await knex("check_lists").insert([
    {
      user_id: "a3JtsldqPnY55rPrUBRsu3zHHwm1",
      title: "hagiのリスト",
    },
    {
      user_id: "UlSHDnuDG4hEFPi6DJznEcdHw8q1",
      title: "masaのリスト",
    },
  ]);
}
