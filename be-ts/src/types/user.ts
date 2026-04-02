export interface User {
  uid: string;
  email: string;
  user_name: string;
  icon_url: string;
  is_admin: boolean;
}

export interface UserServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}

export interface MyInfo {
  uid: string;
  user_name: string;
  email: string;
  icon_url: string;
  is_admin: boolean;
  review_count: number;
  total_like_count: number;
  consume_point: number;
  total_approved_count: number;
  bonus_point: number;
  total_point: number;
  my_point: number;
}

export interface ReviewCountType {
  review_count: number;
}

export interface PointCountType {
  consume_point: number;
  bonus_point: number;
}

export interface LikeCountType {
  total_like_count: number;
}

export interface ApprovedCountType {
  total_approved_count: number;
}
