import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("likes").del();

  // 実際の運用では既存のユーザーIDとレビューIDを取得するのが確実です
  const users = await knex("users").select("uid");
  const reviews = await knex("reviews").select("id");

  // 重複を避けるためのセット（同じユーザーが同じレビューに複数回いいねできない想定）
  const likesData = [
    { user_id: users[0].uid, review_id: reviews[0].id }, //なつみが、レビュー[0]にいいね
    { user_id: users[0].uid, review_id: reviews[1].id }, //なつみが、レビュー[1]にいいね
    { user_id: users[1].uid, review_id: reviews[0].id }, //なおきが、レビュー[0]にいいね
    { user_id: users[2].uid, review_id: reviews[0].id }, //けいが、レビュー[0]にいいね
    // { user_id: users[3].uid, review_id: reviews[3].id }, //testユーザーが、日本のレビューにいいね
  ];

  // データを挿入
  await knex("likes").insert(likesData);
}
