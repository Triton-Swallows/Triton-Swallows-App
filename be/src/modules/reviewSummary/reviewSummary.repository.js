function createReviewSummaryRepository(knex) {
  const getSummary = async (userId) => {
    return await knex("summaries")
      .join("summary_likes", "summaries.id", "summary_likes.review_id")
      .count("summary_likes.review_id as like_count")
      .groupBy("summaries.id")
      .select(
        "summaries.id",
        "summaries.review",
        "summaries.created_at",
        "summaries.country_name",
        knex("summary_likes")
          .whereRaw("summary_likes.review_id = summaries.id")
          .andWhere("summary_likes.user_id", userId)
          .count("summary_likes.review_id")
          .as("liked_by_me"),
        // todo: ロジックの調査
      );
  };

  return { getSummary };
}

module.exports = { createReviewSummaryRepository };
