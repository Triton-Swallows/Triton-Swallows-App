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

// Serviceの返り値の型
export type ServiceResponse<T> = SuccessResponse<T> | ErrorResponse;
