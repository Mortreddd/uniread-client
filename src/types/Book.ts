import { Chapter } from "./Chapter";
import { User } from "@/types/User.ts";
import { BookStatus, Reaction } from "./Enums";
import { PaginateParams } from "@/types/Pagination.ts";

export interface Book {
  id: string;
  user: User;
  title: string;
  image?: string;
  genres: Genre[];
  status: BookStatus;
  coverPhoto: string;
  description?: string;
  matured: boolean;
  completed: boolean;
  readCount?: number;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
  tags?: Tag[];
  bookComments?: BookComment[];
  bookLikes?: BookLike[];
  totalChapterPublishedCount?: number;
  totalChapterDraftsCount?: number;
  totalChaptersCount?: number;
  totalRatingsCount?: number;
  totalReadsCount?: number;
  totalLikesCount?: number;
}

export interface Genre {
  id: number;
  name: string;
  description: string;
  backgroundImage?: string;
  books?: Book[];
}

export interface Tag {
  id: number;
  name: string;
  book: Book;
  createdAt: string;
  updatedAt: string;
}

export interface BookComment {
  id: string;
  book: Book;
  user: User;
  parentBookComment: BookComment;
  rating: number;
  content: string;
  bookCommentLikes: BookCommentLike;
  createdAt: string;
  updatedAt: string;
}

export interface BookLike {
  id: string;
  book: Book;
  user: User;
  reaction: Reaction;
  createdAt: string;
  updatedAt: string;
}

export interface BookCommentLike {
  id: string;
  bookComment: BookComment;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface BookParams extends PaginateParams {
  genres?: number[];
  status?: BookStatus;
  deletedAt?: string;
}

type MutableFieldType = "title" | "description" | "matured";
export interface CreateBookFormProps extends Pick<Book, MutableFieldType> {
  authorId: string | null;
  photo: File | null;
  genreIds: number[];
}
