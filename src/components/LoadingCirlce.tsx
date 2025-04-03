import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface LoadingCircleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingCircleVariant> {}

const loadingCircleVariant = cva("border-4 rounded-full animate-spin", {
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

export default function LoadingCircle({
  variant,
  size,
  className,
  ...props
}: LoadingCircleProps) {
  return (
    <div
      className={cn(loadingCircleVariant({ className, variant, size }))}
      {...props}
    ></div>
  );
}
