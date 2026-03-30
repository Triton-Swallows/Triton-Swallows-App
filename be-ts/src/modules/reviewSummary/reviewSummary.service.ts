import { ReviewSummaryRepository } from "./reviewSummary.repository";
import {
  Summary,
  ServiceResponse,
  SummaryLike,
} from "../../types/reviewSummary";

export interface ReviewSummaryService {
  getSummary: (
    userId: string,
    country: string,
  ) => Promise<ServiceResponse<Summary[]>>;
  getSummaryGuest: (country: string) => Promise<ServiceResponse<Summary[]>>;
  postLike: (
    userId: string,
    summary_id: string,
  ) => Promise<ServiceResponse<SummaryLike[]>>;
  deleteLike: (
    userId: string,
    summary_id: string,
  ) => Promise<ServiceResponse<SummaryLike[]>>;
}

export const createReviewSummaryService = (
  repository: ReviewSummaryRepository,
) => {
  const getSummary = async (
    userId: string,
    country: string,
  ): Promise<ServiceResponse<Summary[]>> => {
    try {
      const summaries = await repository.getSummary(userId, country);
      const data = summaries.map((summary) => ({
        ...summary,
        liked_by_me: !!Number(summary.liked_by_me),
      }));
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const getSummaryGuest = async (
    country: string,
  ): Promise<ServiceResponse<Summary[]>> => {
    try {
      const data = await repository.getSummaryGuest(country);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const postLike = async (
    userId: string,
    summary_id: string,
  ): Promise<ServiceResponse<any>> => {
    try {
      const data = await repository.postLike(userId, summary_id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  const deleteLike = async (
    userId: string,
    summary_id: string,
  ): Promise<ServiceResponse<any>> => {
    try {
      const data = await repository.deleteLike(userId, summary_id);
      return { ok: true, data };
    } catch (error) {
      const err = error as Error;
      return { ok: false, status: 500, message: err.message };
    }
  };

  return { getSummary, getSummaryGuest, postLike, deleteLike };
};
