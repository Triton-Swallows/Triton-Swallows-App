export interface Summary {
  id: string;
  summary: string;
  country_name: string;
  created_at: string;
  like_count: string;
  liked_by_me?: boolean | string;
}

export interface ServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}

export interface SummaryLike {
  summary_id: string;
}
