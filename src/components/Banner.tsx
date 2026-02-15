import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariant> {}
const bannerVariant = cva(
  "rounded-full font-sans py-1 px-3 whitespace-nowrap transition-all duration-200 ease-in-out cursor-pointer",
  {
    variants: {
      variant: {
        primary: "border bg-primary text-white",
        completed: "border bg-green-600 text-white",
        mature: "border bg-red-600 text-white",
        onGoing: "border bg-amber-600 text-white",
        transparent: "border bg-transparent",
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
