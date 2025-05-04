import { useSlate } from "slate-react";
import { Editor, Element, Transforms } from "slate";
import {MarkAlign, MarkElement, MarkKey} from "@/types/Slate";
import Bold from "./Bold";
import Italic from "./Italic";
import Underline from "./Underline";
import Strikethrough from "./Strikethrough";
import TextLeft from "./TextLeft";
import TextRight from "./TextRight";
import { cn } from "@/utils/ClassNames";
import TextJustify from "./TextJustify";
import { HTMLAttributes } from "react";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import TextCenter from "./TextCenter";

const isAlignmentActive = (editor: Editor, format: MarkAlign) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.align === format,
  });
  return !!match;
}

const toggleAlignment = (editor: Editor, format: MarkAlign) => {
  const isActive = isAlignmentActive(editor, format);
  Transforms.setNodes(
      editor,
      { align: isActive ? "left" : format},
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
  )
}

const isBlockActive = (editor: Editor, format: MarkElement) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor: Editor, format: MarkElement) => {
  const isActive = isBlockActive(editor, format);
  Transforms.setNodes(
    editor,
    { type: isActive ? "paragraph" : format },
    { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
  );
};

const isMarkActive = (editor: Editor, format: MarkKey) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: MarkKey) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {}

export default function Toolbar({ className }: ToolbarProps) {
  const editor = useSlate();

  function getActiveMarkAlignmentStyle(editor: Editor, format: MarkAlign) {
    return isAlignmentActive(editor, format) ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-200 bg-transparent";
  }
  function getActiveMarkElementStyle(editor: Editor, format: MarkElement) {
    return isBlockActive(editor, format)
      ? "bg-gray-200 hover:bg-gray-300"
      : "hover:bg-gray-200 bg-transparent";
  }

  function getActiveMarkStyle(editor: Editor, format: MarkKey): string {
    return isMarkActive(editor, format) ? "bg-gray-200 hover:bg-gray-300" : "hover:bg-gray-200 bg-transparent";
  }
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="flex items-center space-x-2">
        <Bold
          className={cn(getActiveMarkStyle(editor, "bold" as MarkKey))}
          onClick={(e) => {
            e.preventDefault();
            toggleMark(editor, "bold" as MarkKey);
          }}
        />
        <Italic
          className={cn(getActiveMarkStyle(editor, "italic" as MarkKey))}
          onClick={(e) => {
            e.preventDefault();
            toggleMark(editor, "italic" as MarkKey);
          }}
        />
        <Underline
          className={cn(getActiveMarkStyle(editor, "underline" as MarkKey))}
          onClick={(e) => {
            e.preventDefault();
            toggleMark(editor, "underline" as MarkKey);
          }}
        />
        <H1
          className={cn(getActiveMarkElementStyle(editor, "h1" as MarkElement))}
          onClick={(e) => {
            e.preventDefault();
            toggleBlock(editor, "h1" as MarkElement);
          }}
        />
        <H2
          className={cn(getActiveMarkElementStyle(editor, "h2" as MarkElement))}
          onClick={(e) => {
            e.preventDefault();
            toggleBlock(editor, "h2" as MarkElement);
          }}
        />
        <H3
          className={cn(getActiveMarkElementStyle(editor, "h3" as MarkElement))}
          onClick={(e) => {
            e.preventDefault();
            toggleBlock(editor, "h3" as MarkElement);
          }}
        />
        <Strikethrough
          className={cn(getActiveMarkStyle(editor, "strikethrough" as MarkKey))}
          onClick={(e) => {
            e.preventDefault();
            toggleMark(editor, "strikethrough" as MarkKey);
          }}
        />
        <TextLeft
          className={cn(
              getActiveMarkAlignmentStyle(editor, "left" as MarkAlign)
          )}
          onClick={(e) => {
            e.preventDefault();
            toggleAlignment(editor, "left" as MarkAlign);
          }}
        />
        <TextRight
          className={cn(
              getActiveMarkAlignmentStyle(editor, "right" as MarkAlign)
          )}
          onClick={(e) => {
            e.preventDefault();
            toggleAlignment(editor, "right" as MarkAlign);
          }}
        />
        <TextCenter
          className={cn(
              getActiveMarkAlignmentStyle(editor, "center" as MarkAlign)
          )}
          onClick={(e) => {
            e.preventDefault();
            toggleAlignment(editor, "center" as MarkAlign);
          }}
        />
        <TextJustify
          className={cn(
              getActiveMarkAlignmentStyle(editor, "justify" as MarkAlign)
          )}
          onClick={(e) => {
            e.preventDefault();
            toggleAlignment(editor, "justify" as MarkAlign);
          }}
        />
      </div>
    </div>
  );
}
