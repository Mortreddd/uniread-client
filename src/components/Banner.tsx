import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariant> {}
const bannerVariant = cva(
  "rounded-full font-sans py-1 px-3 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        completed: "bg-green-600 text-white",
        mature: "bg-red-600 text-white",
        onGoing: "bg-amber-600 text-white",
        transparent: "bg-transparent",
        custom: "",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  }
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
