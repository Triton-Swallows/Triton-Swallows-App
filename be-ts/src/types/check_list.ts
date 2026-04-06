export interface CheckLists {
  id: string;
  user_id: string;
  title: string;
  is_favorite: string;
  hashtag: string;
  created_at: string;
  updated_st: string;
}

export interface CheckListsServiceResponse<T> {
  ok: boolean;
  data?: T;
  status?: number;
  message?: string;
}
