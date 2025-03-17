import { User } from "@/types/User.ts";

export interface Follow {
  id: string;
  follower: User;
  following: User;

  createdAt: string;
  updatedAt: string;
}
