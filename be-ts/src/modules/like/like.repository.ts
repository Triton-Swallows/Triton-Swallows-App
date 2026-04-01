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
    // 同時に2つのテーブルを更新する
    // 整合性を保つため、transaction内で(insert/update)を行う
    return await knex.transaction(async (trx) => {
      const insertedLike = await trx("likes")
        .insert({ user_id, review_id })
        .returning("*");

      await trx("reviews")
        .where("id", review_id)
        .update({
          liked_count: trx.raw("liked_count + 1"),
        });

      return insertedLike;
    });
  };

  const del = async (user_id: string, review_id: string): Promise<Like[]> => {
    // 同時に2つのテーブルを更新する
    // 整合性を保つため、transaction内で(insert/update)を行う
    return await knex.transaction(async (trx) => {
      const deletedLike = await trx("likes")
        .where("user_id", user_id)
        .andWhere("review_id", review_id)
        .del()
        .returning("*");

      await trx("reviews")
        .where("id", review_id)
        .update({
          liked_count: trx.raw("GREATEST(liked_count - 1, 0)"),
        });

      return deletedLike;
    });
  };

  return { findLike, post, del };
}

export { createLikeRepository };
