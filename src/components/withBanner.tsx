import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof withBannerVariant> {}
const withBannerVariant = cva("rounded-full py-1 px-3", {
  variants: {
    variant: {
      primary: "bg-primary",
      completed: "bg-green-600",
      mature: "bg-amber-600",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});
export default function WithBanner({
  className,
  variant,
  children,
  ...props
}: BannerProps) {
  return (
    <div {...props} className={cn(withBannerVariant({ className, variant }))}>
      {children}
    </div>
  );
}
