import { Knex } from "knex";
import { Summary, SummaryLike } from "../../types/reviewSummary";

export interface ReviewSummaryRepository {
  getSummary: (userId: string, country: string) => Promise<Summary[]>;
  getSummaryGuest: (country: string) => Promise<Summary[]>;
  postLike: (userId: string, summary_id: string) => Promise<SummaryLike[]>;
  deleteLike: (userId: string, summary_id: string) => Promise<SummaryLike[]>;
}

export const createReviewSummaryRepository = (knex: Knex) => {
  const getSummary = async (
    userId: string,
    country: string,
  ): Promise<Summary[]> => {
    return await knex("summaries")
      .leftJoin("summary_likes", "summaries.id", "summary_likes.summary_id")
      .count("summary_likes.summary_id as like_count")
      .groupBy("summaries.id")
      .where("summaries.country_name", country)
      .select<
        Summary[]
      >("summaries.id", "summaries.summary", "summaries.created_at", "summaries.country_name", knex("summary_likes").whereRaw("summary_likes.summary_id = summaries.id").andWhere("summary_likes.user_id", userId).count("summary_likes.summary_id").as("liked_by_me"))
      .orderBy("like_count", "desc");
    // return result as unknown as Summary[];
  };

  const getSummaryGuest = async (country: string): Promise<Summary[]> => {
    const result = await knex("summaries")
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
    return result as unknown as Summary[];
  };

  const postLike = async (
    user_id: string,
    summary_id: string,
  ): Promise<SummaryLike[]> => {
    return await knex("summary_likes")
      .insert({ user_id, summary_id })
      .returning("summary_id");
  };

  const deleteLike = async (
    user_id: string,
    summary_id: string,
  ): Promise<SummaryLike[]> => {
    return await knex("summary_likes")
      .where({ user_id, summary_id })
      .del()
      .returning("summary_id");
  };

  return { getSummary, getSummaryGuest, postLike, deleteLike };
};
