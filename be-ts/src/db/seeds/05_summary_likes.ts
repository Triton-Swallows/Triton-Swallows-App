import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("summary_likes").del();

  const users = await knex("users").select("uid");
  const summaries = await knex("summaries").select("id");

  // 重複を避けるためのセット（同じユーザーが同じ要約に複数回いいねできない想定）
  const likesData = [
    { user_id: users[0].uid, summary_id: summaries[0].id },
    { user_id: users[0].uid, summary_id: summaries[1].id },
    { user_id: users[1].uid, summary_id: summaries[0].id },
    { user_id: users[2].uid, summary_id: summaries[2].id },
    { user_id: users[3].uid, summary_id: summaries[3].id },
  ];

  // データを挿入
  await knex("summary_likes").insert(likesData);
}
