function createReviewSummaryRepository(knex) {
  const getSummary = async (userId, country) => {
    return await knex("summaries")
      .leftJoin("summary_likes", "summaries.id", "summary_likes.summary_id")
      .count("summary_likes.review_id as like_count")
      .groupBy("summaries.id")
      .where("summaries.country_name", country)
      .select(
        "summaries.id",
        "summaries.summary",
        "summaries.created_at",
        "summaries.country_name",
        knex("summary_likes")
          .whereRaw("summary_likes.review_id = summaries.id")
          .andWhere("summary_likes.user_id", userId)
          .count("summary_likes.review_id")
          .as("liked_by_me"),
      )
      .orderBy("like_count", "desc");
  };

  return { getSummary };
}

module.exports = { createReviewSummaryRepository };
