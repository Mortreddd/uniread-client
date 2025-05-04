import { memo, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";
import {
  EditableProps,
  RenderElementProps,
} from "slate-react/dist/components/editable";
import Toolbar from "./Toolbar";
import {cn} from "@/utils/ClassNames.ts";

function RenderElement({ attributes, children, element }: RenderElementProps) {
  const alignmentClass = () => {
    switch (element.align) {
      case "center":
        return "text-center";
      case "left":
        return "text-left"
      case "right":
        return "text-right";
      case "justify":
        return "text-justify";
      default:
        return "text-left";
    }
  }
  switch (element.type) {
    case "h1":
      return (
        <h1 {...attributes} className={cn("text-3xl font-bold", alignmentClass())}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 {...attributes} className={cn("text-2xl font-bold", alignmentClass())}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 {...attributes} className={cn("text-xl font-bold", alignmentClass())}>
          {children}
        </h3>
      );
    default:
      return (
        <p {...attributes} className={cn("text-base", alignmentClass())}>
          {children}
        </p>
      );
  }
}
function RenderLeaf({ attributes, children, leaf }: RenderLeafProps) {
  return (
    <span
      {...attributes}
      style={{
        ...(leaf.bold && { fontWeight: "bold" }),
        ...(leaf.italic && { fontStyle: "italic" }),
        textDecoration: [
          leaf.underline ? "underline" : "",
          leaf.strikethrough ? "line-through" : "",
        ]
          .filter(Boolean)
          .join(" "),
      }}
    >
      {children}
    </span>
  );
}

interface TextEditorProps extends EditableProps {
  values: Descendant[];
  onSlateChange: (values: Descendant[]) => void;
}

function TextEditor({
  values,
  onSlateChange,
  placeholder,
  className = "flex-1 w-full",
  ...rest
}: TextEditorProps) {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} initialValue={values} onChange={onSlateChange}>
      <Toolbar className="w-full" />
      <Editable
        {...rest}
        placeholder={placeholder}
        className={`${className} p-2 focus:ring-1 focus:ring-primary focus:outline-none border transition-all duration-200 ease-in-out border-primary rounded`}
        renderLeaf={RenderLeaf}
        renderElement={RenderElement}
      />
    </Slate>
  );
}

export default memo(TextEditor);
