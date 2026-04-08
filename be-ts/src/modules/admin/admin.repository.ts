import { Knex } from "knex";
import {
  User,
  ReviewCountType,
  LikeCountType,
  ContactCountType,
  Points,
  Contacts,
} from "../../types/admin";

export interface AdminRepository {
  getAllUsers: () => Promise<User[]>;
  getReviewCounts: (uids: string[]) => Promise<ReviewCountType[]>;
  getLikeCounts: (uids: string[]) => Promise<LikeCountType[]>;
  getAcceptedCounts: (uids: string[]) => Promise<ContactCountType[]>;
  checkPointsUser: (user_id: string) => Promise<Points>;
  createPoints: (user_id: string) => Promise<void>;
  editPoints: (
    user_id: string,
    bonus_point: string,
    consume_point: string,
  ) => Promise<Points>;
  getContacts: () => Promise<Contacts[]>;
  editContacts: (id: string, is_accepted: boolean) => Promise<Contacts>;
}

export const createAdminRepository = (db: Knex): AdminRepository => {
  // 全ユーザーの基本情報を取得
  const getAllUsers = async (): Promise<User[]> => {
    return await db("users")
      .select(
        "users.uid",
        "users.email",
        "users.user_name",
        "users.icon_url",
        db.raw("COALESCE(points.bonus_point, 0) as bonus_point"),
        db.raw("COALESCE(points.consume_point, 0) as consume_point"),
      )
      .leftJoin("points", "users.uid", "points.user_id");
  };

  // ユーザー毎のレビュー数取得
  const getReviewCounts = async (
    uids: string[],
  ): Promise<ReviewCountType[]> => {
    return await db("reviews")
      .whereIn("user_id", uids)
      .select("user_id")
      .count("id as review_count")
      .groupBy("user_id");
  };

  // ユーザー毎のいいね数取得
  const getLikeCounts = async (uids: string[]): Promise<LikeCountType[]> => {
    return await db("likes")
      .join("reviews", "likes.review_id", "reviews.id")
      .whereIn("reviews.user_id", uids)
      .select("reviews.user_id")
      .count("likes.review_id as total_like_count")
      .groupBy("reviews.user_id");
  };

  // ユーザー毎の記事採用数取得
  const getAcceptedCounts = async (
    uids: string[],
  ): Promise<ContactCountType[]> => {
    return await db("contacts")
      .whereIn("user_id", uids)
      .where("is_accepted", true)
      .select("user_id")
      .count("id as contact_count")
      .groupBy("user_id");
  };

  const checkPointsUser = async (user_id: string): Promise<Points> => {
    return await db("points").where({ user_id }).first();
  };

  const createPoints = async (user_id: string): Promise<void> => {
    await db("points").insert({ user_id });
  };

  const editPoints = async (
    user_id: string,
    bonus_point: string,
    consume_point: string,
  ): Promise<Points> => {
    const results = await db("points")
      .where({ user_id })
      .update({
        bonus_point,
        consume_point,
      })
      .returning("*");

    return results[0];
  };

  const getContacts = async (): Promise<Contacts[]> => {
    return await db("contacts")
      .whereNot("is_checked", true)
      .select("*")
      .orderBy("created_at", "desc");
  };

  const editContacts = async (id: string, is_accepted: boolean) => {
    const result = await db("contacts")
      .where({ id })
      .update({
        is_checked: true,
        is_accepted,
        updated_at: db.fn.now(),
      })
      .returning("*");
    return result[0];
  };

  return {
    getAllUsers,
    getReviewCounts,
    getLikeCounts,
    getAcceptedCounts,
    editPoints,
    getContacts,
    editContacts,
    checkPointsUser,
    createPoints,
  };
};
