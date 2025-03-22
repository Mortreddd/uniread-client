import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface LoadingCircleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingCircleVariant> {}

const loadingCircleVariant = cva(
  "border-4 border-5-transparent rounded-full animation-spin",
  {
    variants: {
      variant: {
        primary: "border-primary",
        secondary: "border-gray-600",
        warning: "border-amber-600",
        danger: "border-red-600",
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
  }
);

export default function LoadingCircle({
  variant,
  size,
  className,
  ...props
}: LoadingCircleProps) {
  return (
    <div className="flex justify-center">
      <div className={cn({ className, variant, size })} {...props}></div>
    </div>
  );
}
