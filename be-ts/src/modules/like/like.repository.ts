import { Knex } from "knex";
import { Like } from "../../types/like";

export interface LikeRepository {
  findLike: (user_id: string, review_id: string) => Promise<Like | undefined>;
  post: (user_id: string, review_id: string) => Promise<Like[]>;
  del: (user_id: string, review_id: string) => Promise<Like[]>;
}

function createLikeRepository(knex: Knex): LikeRepository {
  const findLike = async (
    user_id: string,
    review_id: string,
  ): Promise<Like | undefined> => {
    return await knex("likes")
      .where("likes.user_id", user_id)
      .andWhere("likes.review_id", review_id)
      .first();
  };

  const post = async (user_id: string, review_id: string): Promise<Like[]> => {
    return await knex("likes").insert({ user_id, review_id }).returning("*");
  };

  const del = async (user_id: string, review_id: string): Promise<Like[]> => {
    return await knex("likes")
      .where("user_id", user_id)
      .andWhere("review_id", review_id)
      .del()
      .returning("*");
  };

  return { findLike, post, del };
}

export { createLikeRepository };
