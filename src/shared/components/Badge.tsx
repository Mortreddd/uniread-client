import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariant> {}

const badgeVariant = cva("rounded-full font-sans whitespace-nowrap", {
  variants: {
    variant: {
      red: "bg-red-600 text-white",
      primary: "bg-primary text-white",
      secondary: "bg-gray-200 text-gray-800",
    },
    size: {
      xs: "text-tiny md:text-xs px-1",
      sm: "text-tiny md:text-sm py-0.5 px-1.5",
      md: "text-base py-0.5 px-2",
      lg: "text-lg py-0.5 px-2",
    },
  },

  defaultVariants: {
    variant: "red",
    size: "md",
  },
});

export default function Badge({
  variant,
  className,
  size,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={badgeVariant({ variant, className, size })} {...props}>
      {children}
    </div>
  );
}
