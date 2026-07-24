import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const bookStatusBadgeVariant = cva(
  "px-2 py-0.5 rounded-full md:px-3 md:py-1 font-sans font-semibold uppercase",
  {
    variants: {
      variant: {
        published: "bg-primary dark:bg-primary-dark text-gray-100",
        draft: "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100",
        collaborator: "bg-amber-900 dark:bg-amber-600 text-white",
      },
    },
    defaultVariants: {
      variant: "published",
    },
  },
);

interface BookStatusBadgeProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bookStatusBadgeVariant> {}

export default function BookStatusBadge({
  className,
  variant,
  ...props
}: BookStatusBadgeProps) {
  const text =
    {
      published: "Published",
      draft: "Draft",
      collaborator: "Collaborator",
    }[variant ?? "published"] ?? "";

  return (
    <span
      className={cn(bookStatusBadgeVariant({ variant }), className)}
      {...props}
    >
      {text}
    </span>
  );
}
