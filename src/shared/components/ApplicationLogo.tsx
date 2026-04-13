import logo from "@/assets/uniread.svg";
import { ImgHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames.ts";

interface ApplicaitonLogoProps
  extends
    ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof logoVariant> {}
const logoVariant = cva(
  "object-cover mix-blend-multiply dark:mix-blend-lighten bg-transparent",
  {
    variants: {
      size: {
        default: "h-12 w-44",
        sm: "h-8 w-36",
        md: "h-16 w-52",
        lg: "h-20 w-60",
      },
    },

    defaultVariants: {
      size: "default",
    },
  },
);

function ApplicationLogo({ className, size, ...props }: ApplicaitonLogoProps) {
  return (
    // <img
    //   src={logo}
    //   alt="uniread-logo"
    //   className={cn(logoVariant({ className, size }))}
    //   {...props}
    // />
    <a
      href={"/"}
      className={cn(
        "text-lg  md:text-xl lg:text-2xl font-bold text-primary dark:text-primary-dark",
        className,
      )}
    >
      UniRead
    </a>
  );
}
export default ApplicationLogo;
