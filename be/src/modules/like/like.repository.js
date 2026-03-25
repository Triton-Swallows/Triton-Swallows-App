function createLikeRepository(knex) {
  const findLike = async (user_id, review_id) => {
    return await knex("likes")
      .where("likes.user_id", user_id)
      .andWhere("likes.review_id", review_id)
      .first();
  };

  const post = async (user_id, review_id) => {
    return await knex("likes").insert({ user_id, review_id }).returning("*");
  };

  const del = async (user_id, review_id) => {
    return await knex("likes")
      .where("user_id", user_id)
      .andWhere("review_id", review_id)
      .del()
      .returning("*");
  };

  return { findLike, post, del };
}

module.exports = { createLikeRepository };
