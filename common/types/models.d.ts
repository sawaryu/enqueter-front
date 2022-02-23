export type User = {
  id: number;
  username: string;
  nickname: string;
  introduce: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  role: string;
  is_following?: boolean;
}

export type Question = {
  id: number;
  user_id: number;
  content: string;
  option_first: string;
  option_second: string,
  created_at: string;
  updated_at: string;
  is_answered: boolean;
  is_bookmarked: boolean;
  user: User;
}