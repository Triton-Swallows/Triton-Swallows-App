import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("users").del();
  await knex("users").insert([
    {
      uid: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      email: "jera.hq.devtr.mem010@outlook.jp",
      is_admin: true,
    },
    {
      uid: "qulZYxjU5wfSjZXRc4gir5rxTV23",
      email: "jera.hq.devtr.mem009@outlook.jp",
      is_admin: true,
    },
    {
      uid: "64wVqL7j7BgOKT4RvgtNMTokHwQ2",
      email: "kei.ccbdev07@gmail.com",
      is_admin: true,
    },
    {
      uid: "a3JtsldqPnY55rPrUBRsu3zHHwm1",
      email: "takumi.hagi@toyota.global",
      is_admin: true,
    },
    {
      uid: "UlSHDnuDG4hEFPi6DJznEcdHw8q1",
      email: "masataka.shintoku@gmail.com",
      is_admin: true,
    },
  ]);
}
