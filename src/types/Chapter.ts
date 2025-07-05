import { User } from "@/types/User.ts";
import { ChapterStatus, Reaction } from "./Enums";
import { Paragraph } from "./Paragraph";

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  chapterNumber: number;
  status: ChapterStatus;
  readCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  chapterComments?: ChapterComment[];
  chapterLikes?: ChapterLike[];
  paragraphs?: Paragraph[];
}

export interface ChapterLike {
  id: string;
  users: User[];
  reaction: Reaction;
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
  reaction: Reaction;
  createdAt: string;
  updatedAt: string;
}

export interface ChapterCreationRequest {
  bookId: string;
  title: string;
  content: string;
  status: ChapterStatus;
  paragraphs: Paragraph[];
}
