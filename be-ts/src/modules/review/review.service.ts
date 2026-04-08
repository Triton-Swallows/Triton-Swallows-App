import {
  Review,
  GuestReview,
  MyLikeCount,
  ServiceResponse,
  UserLikeCount,
} from "../../types/review";
import { ReviewRepository } from "./review.repository";

/**
 * Serviceが持つべきメソッドの型を定義。
 */

export interface ReviewService {
  getAll: (userId: string) => Promise<ServiceResponse<Review[]>>;
  getByCountry: (
    userId: string,
    country: string,
  ) => Promise<ServiceResponse<Review[]>>;
  getByCountryGuest: (
    country: string,
  ) => Promise<ServiceResponse<GuestReview[]>>;
  getAllUsersLikeCounts: () => Promise<ServiceResponse<UserLikeCount[]>>;
  getMyLikeCount: (userId: string) => Promise<ServiceResponse<MyLikeCount[]>>;
  post: (
    userId: string,
    review: string,
    country: string,
  ) => Promise<ServiceResponse<Review[]>>;
}

/**
 *実際のメイン関数
 */

function createReviewService(repository: ReviewRepository): ReviewService {
  const getAll = async (userId: string): Promise<ServiceResponse<Review[]>> => {
    try {
      const reviews = await repository.getAll(userId);
      const data = reviews.map((review) => ({
        ...review,
        liked_by_me: Boolean(Number(review.liked_by_me)),
      }));
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getByCountry = async (
    userId: string,
    country: string,
  ): Promise<ServiceResponse<Review[]>> => {
    try {
      const reviews = await repository.getByCountry(userId, country);
      const data = reviews.map((review) => ({
        ...review,
        liked_by_me: Boolean(Number(review.liked_by_me)),
      }));
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getByCountryGuest = async (
    country: string,
  ): Promise<ServiceResponse<GuestReview[]>> => {
    try {
      const data = await repository.getByCountryGuest(country);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getAllUsersLikeCounts = async (): Promise<
    ServiceResponse<UserLikeCount[]>
  > => {
    try {
      const data = await repository.getAllUsersLikeCounts();
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getMyLikeCount = async (
    userId: string,
  ): Promise<ServiceResponse<MyLikeCount[]>> => {
    try {
      const data = await repository.getMyLikeCount(userId);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const post = async (
    userId: string,
    review: string,
    country: string,
  ): Promise<ServiceResponse<Review[]>> => {
    try {
      const rawData = await repository.post(userId, review, country);
      const data: Review[] = rawData.map((el) => ({
        ...el,
        liked_by_me: Boolean(0),
      }));
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
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

export { createReviewService };
