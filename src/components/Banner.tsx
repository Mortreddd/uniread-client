import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariant> {}
const bannerVariant = cva("rounded-full py-1 px-3", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      completed: "bg-green-600 text-white",
      mature: "bg-amber-600 text-white",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});
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
