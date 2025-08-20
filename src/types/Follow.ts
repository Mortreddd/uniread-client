import {AuthorDetail} from "@/types/User.ts";

export interface Follow {
  id: string;
  follower: AuthorDetail;
  following: AuthorDetail;
  createdAt: string;
  updatedAt: string;
}