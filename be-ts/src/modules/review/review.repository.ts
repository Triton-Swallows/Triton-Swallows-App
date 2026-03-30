import { Knex } from "knex";
import { GuestReview, RawReview } from "../../types/review";

/**
 * Repositoryが持つべきメソッドの型を定義。
 */

export interface ReviewRepository {
  getAll: (userId: string) => Promise<RawReview[]>;
  getByCountry: (userId: string, country: string) => Promise<RawReview[]>;
  getByCountryGuest: (country: string) => Promise<GuestReview[]>;
  post: (
    userId: string,
    review: string,
    country: string,
  ) => Promise<RawReview[]>;
}

/**
 *実際のメイン関数
 */

function createReviewRepository(db: Knex): ReviewRepository {
  const getAll = async (userId: string): Promise<RawReview[]> => {
    return await db("reviews")
      .leftJoin("likes", "reviews.id", "likes.review_id")
      .count("likes.review_id as like_count")
      .groupBy("reviews.id")
      .select<RawReview[]>(
        "reviews.id",
        "reviews.user_id",
        "reviews.review",
        "reviews.created_at",
        "reviews.country_name",
        db("likes")
          .whereRaw("likes.review_id = reviews.id")
          .andWhere("likes.user_id", userId)
          .count("likes.review_id")
          .as("liked_by_me"),
        // todo: ロジックの調査
      );
  };

  const getByCountry = async (
    userId: string,
    country: string,
  ): Promise<RawReview[]> => {
    return await db("reviews")
      .leftJoin("likes", "reviews.id", "likes.review_id")
      .count("likes.review_id as like_count")
      .groupBy("reviews.id")
      .where("reviews.country_name", country)
      .select<
        RawReview[]
      >("reviews.id", "reviews.user_id", "reviews.review", "reviews.created_at", "reviews.country_name", db("likes").whereRaw("likes.review_id = reviews.id").andWhere("likes.user_id", userId).count("likes.review_id").as("liked_by_me"))
      .orderBy("reviews.created_at", "desc");
  };

  const getByCountryGuest = async (country: string): Promise<GuestReview[]> => {
    return await db("reviews")
      .leftJoin("likes", "reviews.id", "likes.review_id")
      .count("likes.review_id as like_count")
      .groupBy("reviews.id")
      .where("reviews.country_name", country)
      .select<
        GuestReview[]
      >("reviews.id", "reviews.user_id", "reviews.review", "reviews.created_at", "reviews.country_name")
      .orderBy("reviews.created_at", "desc");
  };

  const post = async (
    userId: string,
    review: string,
    country: string,
  ): Promise<RawReview[]> => {
    return await db("reviews")
      .insert({
        user_id: userId,
        review: review,
        country_name: country,
      })
      .returning<RawReview[]>("*");
  };

  return { getAll, getByCountry, getByCountryGuest, post };
}

export { createReviewRepository };
