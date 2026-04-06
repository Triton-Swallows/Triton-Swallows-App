export interface Item {
  id: string;
  check_list_id: string;
  item: string;
  status: string;
  category: string;
  created_at: string;
  updated_st: string;
}

export interface ItemServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}
