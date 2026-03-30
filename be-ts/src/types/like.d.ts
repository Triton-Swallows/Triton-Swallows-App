export interface Like {
  id: number; // または string。DBの設計に合わせてください
  user_id: string;
  review_id: string;
  created_at?: Date;
}

export type ServiceResponse<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };
