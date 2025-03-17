import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const alertVariants = cva(
  "rounded-lg p-2 md:p-4 w-full md:min-w-64 h-fit min-w-52 my-1 md:my-2",
  {
    variants: {
      variant: {
        danger: "bg-red-600 text-white",
        success: "bg-green-600 text-white",
        warning: "bg-amber-600 text-white",
        info: "bg-blue-600 text-white",
      },
      position: {
        relative: "relative",
        absolute: "absolute",
      },
    },
    defaultVariants: {
      variant: "info",
      position: "relative",
    },
  }
);

interface AlertVariantsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}
export default function Alert({
  className,
  variant,
  children,
  ...rest
}: AlertVariantsProps) {
  return (
    <div className={cn(alertVariants({ className, variant }))} {...rest}>
      {children}
    </div>
  );
}
