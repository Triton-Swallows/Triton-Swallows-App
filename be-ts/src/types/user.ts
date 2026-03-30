export interface User {
  uid: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}
