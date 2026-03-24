const { groupBy } = require("../../knex");

function createReviewRepository(knex) {
  const getAll = async (userId) => {
    return await knex("reviews")
      .join("likes", "reviews.id", "likes.review_id")
      .count("likes.review_id as like_count")
      .groupBy("reviews.id")
      .select(
        "reviews.id",
        "reviews.user_id",
        "reviews.review",
        "reviews.created_at",
        "reviews.country_name",
        knex("likes")
          .whereRaw("likes.review_id = reviews.id")
          .andWhere("likes.user_id", userId)
          .count("likes.review_id")
          .as("liked_by_me"),
        // todo: ロジックの調査
      );
  };

  return { getAll };
}

module.exports = { createReviewRepository };
