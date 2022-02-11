import { User } from "~/common/entity/User";
export interface UserRanking {
  user: User;
  stats: {
    rank: number,
    point: number,
  }
}