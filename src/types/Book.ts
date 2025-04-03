import { Chapter } from "./Chapter";
import { User } from "@/types/User.ts";

export interface Book {
  id: string;
  user: User;
  title: string;
  image?: string;
  genres: Genre[];
  coverPhoto: string;
  description?: string;
  matured: boolean;
  completed: boolean;
  readCount?: number;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
  tags?: Tag[];
  bookComments?: BookComment;
  bookLikes?: BookLike;
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
  users: User[];
  createdAt: string;
  updatedAt: string;
}

export interface BookCommentLike {
  id: string;
  bookComment: BookComment;
  users: User[];
  createdAt: string;
  updatedAt: string;
}
