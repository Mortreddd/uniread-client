import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { LabelHTMLAttributes } from "react";

const labelVariant = cva("font-sans tracking-wide transition-colors", {
  variants: {
    variant: {
      default: "text-gray-700 dark:text-gray-300",
      primary: "text-primary",
      muted: "text-gray-500 dark:text-gray-400",
      error: "text-red-500",
    },
    size: {
      sm: "text-xs",
      md: "text-tiny md:text-xs lg:text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
    disabled: {
      true: "opacity-60 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
});

interface LabelProps
  extends
    LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariant> {
  required?: boolean;
}

export default function Label({
  className,
  variant,
  size,
  disabled,
  required,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(labelVariant({ variant, size, disabled }), className)}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
