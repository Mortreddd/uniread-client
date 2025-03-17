import { Chapter } from "./Chapter";
import { User } from "@/types/User.ts";

export interface Book {
  id: string;
  authorId: number;
  title: string;
  image?: string;
  description?: string;
  matured: boolean;
  readCount?: number;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
  tags?: Tag[];
  bookComments: BookComment;
  bookLikes: BookLike;
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
