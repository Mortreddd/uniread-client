import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariant> {}
const bannerVariant = cva(
  "rounded-full py-1 px-3 whitespace-nowrap transition-all duration-200 ease-in-out cursor-pointer tracking-wide inline-flex items-center gap-1 md:gap-2",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white dark:bg-primary-dark dark:text-gray-100",
        completed:
          "bg-green-600 text-white dark:bg-green-400 dark:text-gray-800",
        mature: "bg-red-600 text-white dark:bg-red-400 dark:text-gray-800",
        onGoing: "bg-amber-600 text-white dark:bg-amber-400 dark:text-gray-800",
        transparent: "bg-transparent text-gray-700 dark:text-gray-300",
        editorsChoice: "bg-amber-800 text-white dark:bg-amber-800",
        custom: "",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  },
);
export default function Banner({
  className,
  variant,
  children,
  ...props
}: BannerProps) {
  return (
    <div {...props} className={cn(bannerVariant({ className, variant }))}>
      {children}
    </div>
  );
}
