import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("contacts").del();

  // Inserts seed entries
  await knex("contacts").insert([
    {
      user_id: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      email: "jera.hq.devtr.mem010@outlook.jp",
      target: "ESTA詳細ページ",
      description: "ESTAじゃなくてESTEです",
      others: "特になし",
      is_checked: false,
      is_accepted: false,
    },
    {
      user_id: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      email: "jera.hq.devtr.mem010@outlook.jp",
      target: "お見積り",
      description: "プレミアムプランの料金体系について。",
      others: "至急返信希望",
      is_checked: false,
      is_accepted: false,
    },
    {
      user_id: "6SpgBAFdthRoHCYeacUhjV11Idz2",
      email: "jera.hq.devtr.mem010@outlook.jp",
      target: "バグ報告",
      description: "ログイン画面でエラーが表示されます。",
      others: null, // text型でnullable（あるいはデフォルト値なし）の場合はnull指定可
      is_checked: false,
      is_accepted: false,
    },
  ]);
}
