export interface User {
  uid: string;
  email: string;
  user_name: string;
  icon_url: string;
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
  review_count: number;
  total_like_count: number;
  total_point: number;
}

export interface ReviewCountType {
  review_count: number;
}

export interface PointCountType {
  total_point: number;
}

export interface LikeCountType {
  total_like_count: number;
}
