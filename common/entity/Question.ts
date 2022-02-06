import { User } from "~/common/entity/User";
export interface Question {
  id: number;
  user_id: number;
  content: string;
  closed_at: string;
  created_at: string;
  updated_at: string;
  is_open: boolean;
  is_answered: boolean;
  is_bookmarked: boolean;
  user: User;
}