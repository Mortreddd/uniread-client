import { Chapter } from "./Chapter";
import { ParagraphStatus, Reaction } from "./Enums";
import { User } from "./User";

export interface Paragraph {
  id: string;
  chapter: Chapter;
  status: ParagraphStatus;
  content: string;
  createdAt: string;
  updatedAt: string;
  paragraphComments: PargraphComment[];
}

export interface PargraphComment {
  id: string;
  user: User;
  chapter: Chapter;
  content: string;
  createdAt: string;
  updatedAt: string;
  paragraphCommentLikes: ParagraphCommentLike[];
}

export interface ParagraphCommentLike {
  id: string;
  paragraphComment: PargraphComment;
  user: User;
  reaction: Reaction;
}
