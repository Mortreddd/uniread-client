import { User, UserProfile } from "@/types/User.ts";
import { PaginateParams } from "@/shared/types/Pagination";
import { Reaction } from "@/types/Enums";
import { Gender } from "@/features/users/types/User";

export enum BookStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  HIATUS = "HIATUS",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

export interface BookAuthor {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  avatarUrl: string;
}
export interface BookDetail {
  id: string;
  title: string;
  description: string;
  author: BookAuthor;
  averageRating: number;
  totalRating: number;
  readCount: number;
  coverPhoto: string;
  totalLikes: number;
  totalChapters: number;
  status: BookStatus;
  completed: boolean;
  matured: boolean;
  genres: Genre[];
  isAddedToLibrary: boolean;
  isFollowingAuthor: boolean;
  createdAt: string;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface BookCommentReactor {
  id: string;
  bookCommentId: string;
  userId: string;
  reaction: Reaction;
  createdAt: string;
  updatedAt: string;
}
