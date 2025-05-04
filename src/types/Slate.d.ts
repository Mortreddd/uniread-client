import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export interface CustomText {
  type?: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  highlight?: boolean;
  link?: string;
}

type Alignment = "left" | "center" | "right" | "justify"

type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "paragraph"
  | "bulleted-list"
  | "numbered-list"
  | "list-item"
  | "block-quote"
  | "code-block"
  | "image"
  | "video"
  | "audio"
  | "table"
  | "table-row"
  | "table-cell"
  | "custom-element";

export interface CustomElement {
  type: ElementType;
  align?: Alignment
  children: CustomText[];
}

export type MarkAlign = Alignment;
export type MarkKey = keyof Omit<CustomText, "text">;
export type MarkElement = ElementType;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    CustomText: { text: string };
    Element: CustomElement;
    Text: CustomText;
  }
}
