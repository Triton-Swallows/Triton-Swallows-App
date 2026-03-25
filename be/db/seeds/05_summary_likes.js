/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("summary_likes").del();

  const users = await knex("users").select("uid");
  const reviews = await knex("reviews").select("id");

  // 重複を避けるためのセット（同じユーザーが同じレビューに複数回いいねできない想定）
  const likesData = [
    { user_id: users[0].uid, summary_id: reviews[0].id }, //なつみが、レビュー[0]にいいね
    { user_id: users[0].uid, summary_id: reviews[1].id }, //なつみが、レビュー[1]にいいね
    { user_id: users[1].uid, summary_id: reviews[0].id }, //なおきが、レビュー[0]にいいね
    { user_id: users[2].uid, summary_id: reviews[2].id }, //けいが、レビュー[2]にいいね
    { user_id: users[3].uid, summary_id: reviews[3].id }, //testユーザーが、日本のレビューにいいね
  ];

  // データを挿入
  await knex("summary_likes").insert(likesData);
};
