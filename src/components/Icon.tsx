import defaultProfile from "@/assets/profiles/default-profile.jpg";
import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { ImgHTMLAttributes } from "react";

interface IconProps
  extends ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarIconVariant> {}
const avatarIconVariant = cva("rounded-full", {
  variants: {
    size: {
      default: "size-9",
      xs: "size-4",
      sm: "size-6",
      md: "size-9",
      lg: "size-14",
      xl: "size-20",
      "2xl": "size-28",
      profile: "size-44",
    },
    bordered: {
      primary: "border-primary border-solid border-2",
      none: "",
    },
  },
  defaultVariants: {
    size: "default",
    bordered: "none",
  },
});
export default function Icon({ src, size, className, ...props }: IconProps) {
  return (
    <img
      src={src ?? defaultProfile}
      className={cn(avatarIconVariant({ size, className }))}
      {...props}
    />
  );
}
