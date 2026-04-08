export interface User {
  uid: string;
  email: string;
  user_name: string;
  icon_url: string;
  bonus_point: number;
  consume_point: number;
}

export interface AdminServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}

export interface Info {
  uid: string;
  email: string;
  user_name: string;
  icon_url: string;
  bonus_point: number;
  consume_point: number;
  review_count: number;
  total_like_count: number;
  accepted_count: number;
  total_point: number;
  my_point: number;
}

export interface ReviewCountType {
  user_id: string;
  review_count: number;
}

export interface LikeCountType {
  user_id: string;
  total_like_count: number;
}

export interface ContactCountType {
  user_id: string;
  contact_count: number;
}

export interface Points {
  id: number;
  user_id: string;
  bonus_point: number;
  consume_point: number;
}

export interface Contacts {
  id: number;
  user_id: string;
  email: string;
  target: string;
  description: string;
  others: string;
  is_checked: boolean;
  bonus_rate: number;
  created_at: string;
  updated_at: string;
}
