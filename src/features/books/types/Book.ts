import { User } from "@/types/User.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import { Reaction } from "@/types/Enums";
import { Gender } from "@/features/users/types/User";

export enum BookStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  HIATUS = "HIATUS",
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
  totalChapters: number; // Only published chapters if not author and include the
  status: BookStatus;
  completed: boolean;
  matured: boolean;
  genres: Genre[];
  isAddedToLibrary: boolean;
  createdAt: string;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface Tag {
  id: number;
  name: string;
  book: BookDetail;
  createdAt: string;
  updatedAt: string;
}

export interface BookComment {
  id: string;
  book: BookDetail;
  user: User;
  parentBookComment: BookComment;
  rating: number;
  content: string;
  reactions: BookCommentReactor[];
  createdAt: string;
  updatedAt: string;
}

export interface BookCommentReactor {
  id: string;
  bookCommentId: string;
  userId: string;
  reaction: Reaction;
  createdAt: string;
  updatedAt: string;
}

export interface BookLike {
  id: string;
  book: BookDetail;
  user: User;
  reaction: Reaction;
  createdAt: string;
  updatedAt: string;
}

export interface BookParams extends PaginateParams {
  genres?: number[];
  status?: BookStatus;
  deletedAt?: string;
}

type MutableFieldType = "title" | "description" | "matured";
export interface CreateBookFormProps extends Pick<
  BookDetail,
  MutableFieldType
> {
  photo: File | null;
  genreIds: number[];
}

export interface CreateReviewFormProps {
  rating: number;
  content: string;
}
