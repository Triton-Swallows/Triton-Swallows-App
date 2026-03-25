function createReviewSummaryRepository(knex) {
  const getSummary = async (userId, country) => {
    return await knex("summaries")
      .leftJoin("summary_likes", "summaries.id", "summary_likes.summary_id")
      .count("summary_likes.summary_id as like_count")
      .groupBy("summaries.id")
      .where("summaries.country_name", country)
      .select(
        "summaries.id",
        "summaries.summary",
        "summaries.created_at",
        "summaries.country_name",
        knex("summary_likes")
          .whereRaw("summary_likes.summary_id = summaries.id")
          .andWhere("summary_likes.user_id", userId)
          .count("summary_likes.summary_id")
          .as("liked_by_me"),
      )
      .orderBy("like_count", "desc");
  };

  const getSummaryGuest = async (country) => {
    return await knex("summaries")
      .leftJoin("summary_likes", "summaries.id", "summary_likes.summary_id")
      .count("summary_likes.summary_id as like_count")
      .groupBy("summaries.id")
      .where("summaries.country_name", country)
      .select(
        "summaries.id",
        "summaries.summary",
        "summaries.created_at",
        "summaries.country_name",
      )
      .orderBy("like_count", "desc");
  };

  const postLike = async (user_id, summary_id) => {
    return await knex("summary_likes").insert({ user_id, summary_id });
  };

  const deleteLike = async (user_id, summary_id) => {
    return await knex("summary_likes").where({ user_id, summary_id }).del();
  };

  return { getSummary, getSummaryGuest, postLike, deleteLike };
}

module.exports = { createReviewSummaryRepository };
