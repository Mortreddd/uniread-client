import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface SpinnerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariant> {}

const spinnerVariant = cva("border-4 rounded-full animate-spin", {
  variants: {
    variant: {
      primary: "border-primary border-t-transparent",
      secondary: "border-gray-600 border-t-transparent",
      warning: "border-amber-600 border-t-transparent",
      danger: "border-red-600 border-t-transparent",
      light: "border-white border-t-transparent",
    },
    size: {
      xs: "size-4",
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
      xxl: "size-14",
      xxxl: "size-16",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export default function Spinner({
  variant,
  size,
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariant({ className, variant, size }))}
      {...props}
    ></div>
  );
}
