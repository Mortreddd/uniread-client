import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, memo } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {}

/**
 * The input styles with differnt variants
 */
const inputVariant = cva(
  "inline-flex outline-0 justify-start items-center transition-all rounded font-medium duration-200 ease-in-out placeholder:text-gray-300",
  {
    variants: {
      variant: {
        primary:
          "text-primary border border-primary focus:ring-1 focus:ring-primary",
        default:
          "text-gray-800 ring-gray-500 ring-gray-500 ring-0 border-2 border-gray-500 focus:ring-2 focus:border-0 focus:ring-gray-500",
        none: "",
      },
      inputSize: {
        sm: "px-2 py-1",
        md: "px-3 py-2",
        lg: "px-4 py-3 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "sm",
    },
  }
);

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, ...props }, ref) => {
      return (
        <input
          ref={ref}
          {...props}
          className={cn(inputVariant({ className, variant }))}
        />
      );
    }
  )
);
