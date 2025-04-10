import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const textareaVariants = cva(
  "rounded p-2 md:p-3 border-primary border focus:ring-1 focus:ring-primary outline-0 transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        primary: "border-primary ring-primary",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  }
);

export default function TextArea({
  rows = 3,
  variant,
  className,
  children,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(textareaVariants({ className, variant }))}
      {...props}
    >
      {children}
    </textarea>
  );
}
