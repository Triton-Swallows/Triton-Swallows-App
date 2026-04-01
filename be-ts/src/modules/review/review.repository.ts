import { Knex } from "knex";
import {
  GuestReview,
  MyLikeCount,
  RawReview,
  UserLikeCount,
} from "../../types/review";

/**
 * Repositoryが持つべきメソッドの型を定義。
 */

export interface ReviewRepository {
  getAll: (userId: string) => Promise<RawReview[]>;
  getByCountry: (userId: string, country: string) => Promise<RawReview[]>;
  getByCountryGuest: (country: string) => Promise<GuestReview[]>;
  getAllUsersLikeCounts: () => Promise<UserLikeCount[]>;
  getMyLikeCount: (userId: string) => Promise<MyLikeCount[]>;
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
  const selectLikeCount = db.raw("reviews.liked_count as like_count");
  const selectLikedByMe = (userId: string) =>
    db("likes")
      .whereRaw("likes.review_id = reviews.id")
      .andWhere("likes.user_id", userId)
      .count("likes.review_id")
      .as("liked_by_me");

  const getAll = async (userId: string): Promise<RawReview[]> => {
    const rows = await db("reviews")
      .select(
        "reviews.id",
        "reviews.user_id",
        "reviews.review",
        "reviews.created_at",
        "reviews.country_name",
        selectLikeCount,
        selectLikedByMe(userId),
      )
      .orderBy("reviews.created_at", "desc");

    return rows as RawReview[];
  };

  const getByCountry = async (
    userId: string,
    country: string,
  ): Promise<RawReview[]> => {
    const rows = await db("reviews")
      .where("reviews.country_name", country)
      .select(
        "reviews.id",
        "reviews.user_id",
        "reviews.review",
        "reviews.created_at",
        "reviews.country_name",
        selectLikeCount,
        selectLikedByMe(userId),
      )
      .orderBy("reviews.created_at", "desc");

    return rows as RawReview[];
  };

  const getByCountryGuest = async (country: string): Promise<GuestReview[]> => {
    const rows = await db("reviews")
      .where("reviews.country_name", country)
      .select(
        "reviews.id",
        "reviews.user_id",
        "reviews.review",
        "reviews.created_at",
        "reviews.country_name",
        selectLikeCount,
      )
      .orderBy("reviews.created_at", "desc");

    return rows as GuestReview[];
  };

  const getAllUsersLikeCounts = async (): Promise<UserLikeCount[]> => {
    const rows = await db("reviews")
      .groupBy("reviews.user_id")
      .select(
        "reviews.user_id",
        db.raw("SUM(reviews.liked_count)::integer as total_like_count"),
      ) // pgの仕様でSUMの返り値がstringになる可能性があるらしい...ので::integerキャストしている
      .orderBy("reviews.user_id", "asc");

    return rows as UserLikeCount[];
  };

  const getMyLikeCount = async (userId: string): Promise<MyLikeCount[]> => {
    const rows = await db("users")
      .leftJoin("reviews", "users.uid", "reviews.user_id")
      .where("users.uid", userId)
      .groupBy("users.uid")
      .select(
        db.raw(
          "COALESCE(SUM(reviews.liked_count), 0)::integer as total_like_count",
        ),
      );

    return rows as MyLikeCount[];
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

  return {
    getAll,
    getByCountry,
    getByCountryGuest,
    getAllUsersLikeCounts,
    getMyLikeCount,
    post,
  };
}

export { createReviewRepository };
