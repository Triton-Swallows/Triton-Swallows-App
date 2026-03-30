import { LikeRepository } from "./like.repository";
import { ServiceResponse, Like } from "../../types/like";

export interface LikeService {
  post: (
    user_id: string,
    review_id: string,
  ) => Promise<ServiceResponse<Like[]>>;
  del: (user_id: string, review_id: string) => Promise<ServiceResponse<Like[]>>;
}

function createLikeService(repository: LikeRepository): LikeService {
  const post = async (
    user_id: string,
    review_id: string,
  ): Promise<ServiceResponse<Like[]>> => {
    const existing = await repository.findLike(user_id, review_id);
    if (!existing) {
      try {
        const data = await repository.post(user_id, review_id);
        return { ok: true, data };
      } catch (error) {
        const err = error as Error;
        return { ok: false, status: 500, message: err.message };
      }
    } else {
      return { ok: false, status: 400, message: "既にいいねしています" };
    }
  };

  const del = async (
    user_id: string,
    review_id: string,
  ): Promise<ServiceResponse<Like[]>> => {
    const existing = await repository.findLike(user_id, review_id);
    if (existing) {
      try {
        const data = await repository.del(user_id, review_id);
        return { ok: true, data };
      } catch (error) {
        const err = error as Error;
        return { ok: false, status: 500, message: err.message };
      }
    } else {
      return { ok: false, status: 400, message: "いいねしていません" };
    }
  };

  return { post, del };
}

export { createLikeService };
