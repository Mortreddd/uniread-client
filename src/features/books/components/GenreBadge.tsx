import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const genreBadgeVariants = cva(
  "max-w-fit rounded text-wrap py-0.5 px-1 bg-gray-300 dark:bg-slate-700 text-gray-700 font-semibold dark:text-gray-300",
  {
    variants: {
      textSize: {
        nano: "text-nano md:text-extratiny lg:text-tiny",
        extratiny: "text-extratiny md:text-tiny lg:text-xs",
      },
    },
    defaultVariants: {
      textSize: "extratiny",
    },
  },
);

interface GenreBadgeProps
  extends
    HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof genreBadgeVariants> {
  name: string;
}

export default function GenreBadge({
  name,
  textSize,
  className,
  ...rest
}: GenreBadgeProps) {
  return (
    <span className={cn(genreBadgeVariants({ textSize }), className)} {...rest}>
      {name}
    </span>
  );
}
