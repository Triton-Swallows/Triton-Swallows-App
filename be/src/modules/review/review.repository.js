function createReviewRepository(knex) {
  const getAll = async (userId) => {
    return await knex("reviews")
      .leftJoin("likes", "reviews.id", "likes.review_id")
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

  const getByCountry = async (userId, country) => {
    return await knex("reviews")
      .leftJoin("likes", "reviews.id", "likes.review_id")
      .count("likes.review_id as like_count")
      .groupBy("reviews.id")
      .where("reviews.country_name", country)
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
      )
      .orderBy("reviews.created_at", "desc");
  };

  const getByCountryGuest = async (country) => {
    return await knex("reviews")
      .leftJoin("likes", "reviews.id", "likes.review_id")
      .count("likes.review_id as like_count")
      .groupBy("reviews.id")
      .where("reviews.country_name", country)
      .select(
        "reviews.id",
        "reviews.user_id",
        "reviews.review",
        "reviews.created_at",
        "reviews.country_name",
      )
      .orderBy("reviews.created_at", "desc");
  };

  const post = async (userId, review, country) => {
    return await knex("reviews")
      .insert({
        user_id: userId,
        review: review,
        country_name: country,
      })
      .returning("*");
  };

  return { getAll, getByCountry, getByCountryGuest, post };
}

module.exports = { createReviewRepository };
