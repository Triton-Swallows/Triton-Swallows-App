// ログインユーザー用レビュー（liked_by_me あり）
export interface RawReview {
  id: string;
  user_id: string;
  user_name: string;
  icon_url: string;
  review: string;
  country_name: string;
  created_at: string;
  like_count: number;
  liked_by_me: string;
}

// ゲスト用レビュー（liked_by_me なし）
// export interface GuestReview extends Omit<RawReview, "liked_by_me"> {}でもかける
export interface GuestReview {
  id: string;
  user_id: string;
  user_name: string;
  icon_url: string;
  review: string;
  country_name: string;
  created_at: string;
  like_count: number;
}

// export interface RawReview {
//   id: string;
//   user_id: string;
//   review: string;
//   country_name: string;
//   created_at: string;
//   like_count: string;
//   liked_by_me?: string | boolean;
// }

// 整形済みレビュー（service層で liked_by_me を boolean に変換後）
export interface Review {
  id: string;
  user_id: string;
  review: string;
  country_name: string;
  created_at: string;
  like_count: number;
  liked_by_me: boolean;
}

export interface UserLikeCount {
  user_id: string;
  total_like_count: number;
}

export interface MyLikeCount {
  total_like_count: number;
}

// 成功レスポンスの型
export interface SuccessResponse<T> {
  ok: true;
  data: T;
}

// 失敗レスポンスの型
export interface ErrorResponse {
  ok: false;
  status: number;
  message: string;
}

// ReviewServiceの返り値の型
export type ServiceResponse<T> = SuccessResponse<T> | ErrorResponse;
