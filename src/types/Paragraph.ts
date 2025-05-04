import { Descendant } from "slate";
import { Chapter } from "./Chapter";
import { Reaction } from "./Enums";
import { User } from "./User";
import {CustomElement} from "@/types/Slate";

export interface Paragraph {
  id?: string;
  chapter?: Chapter;
  chapterId?: string;
  content: string;
  alignment: string;
  position: number;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  paragraphComments?: ParagraphComment[];
}

export interface ParagraphComment {
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
  paragraphComment: ParagraphComment;
  user: User;
  reaction: Reaction;
}

export interface EditParagraph
  extends Pick<Paragraph, "content" | "type" | "alignment" | "position"> {
  chapterId?: string;
}

export function paragraphToDescendant(paragraph: Paragraph): Descendant {
  return {
    type: paragraph.type,
    align: paragraph.alignment ?? "left",
    children: JSON.parse(paragraph.content),
  } as CustomElement;
}

export function paragraphsToDescendants(paragraphs: Paragraph[]): Descendant[] {
  return paragraphs.map((paragraph) => paragraphToDescendant(paragraph));
}

export function descendantToParagraph(
  descendant: Descendant,
  chapterId: string,
  position: number
): EditParagraph {

  const element = descendant as CustomElement;
  return {
    type: element.type ?? "paragraph",
    alignment: element.align ?? "left",
    content: JSON.stringify("children" in descendant ? descendant.children : []),
    position,
    chapterId,
  };
}

export function descendantsToParagraphs(
  descendants: Descendant[],
  chapterId: string
): EditParagraph[] {
  return descendants.map((descendant, index) => {
    return descendantToParagraph(descendant, chapterId, index);
  });
}
