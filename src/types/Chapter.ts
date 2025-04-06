import { Book } from "@/types//Book.ts";
import { User } from "@/types/User.ts";

export interface Chapter {
  id: string;
  book: Book;
  title: string;
  content: string;
  chapterNumber: number;
  readCount?: number;
  createdAt: string;
  updatedAt: string;
  chapterComments?: ChapterComment[];
  chapterLikes?: ChapterLike[];
}

export interface ChapterLike {
  id: string;
  users: User[];
  chapter: Chapter;
  createdAt: string;
  updatedAt: string;
}

export interface ChapterComment {
  id: string;
  chapter: Chapter;
  user: User;
  parentChapterComment: ChapterComment | null;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;

  chapterCommentLikes: ChapterCommentLike[];
}

export interface ChapterCommentLike {
  id: string;
  chapterComment: ChapterComment;
  user: User;
  createdAt: string;
  updatedAt: string;
}
