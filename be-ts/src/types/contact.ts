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

export interface ContactServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}
