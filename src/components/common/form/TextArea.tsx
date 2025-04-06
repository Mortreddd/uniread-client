import { cva, VariantProps } from "class-variance-authority";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const textareaVariants = cva("rounded border-2 p-2 md:p-3", {
  variants: {
    variant: {
      primary: "focus:border-primary focus:border-2",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

export default function TextArea({
  rows = 3,
  children,
  ...props
}: TextAreaProps) {
  return (
    <textarea rows={rows} {...props}>
      {children}
    </textarea>
  );
}
