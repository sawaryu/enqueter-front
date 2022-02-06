export interface User {
  id: number;
  username: string;
  nickname: string;
  introduce: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  is_following: boolean;
  role: string;
}