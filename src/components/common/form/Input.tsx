import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, memo } from "react";

interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "disabled">,
    VariantProps<typeof inputVariant> {
  loading?: boolean;
  withSearch?: boolean;
}

/**
 * The input styles with differnt variants
 */
const inputVariant = cva(
  // 1. Base wrapper: Added 'ring-offset-background' for a cleaner look
  "inline-flex items-center transition-all rounded-sm duration-200 ease-in-out border outline-none",
  {
    variants: {
      variant: {
        // 2. Use focus-within: instead of focus:
        primary:
          "border-primary focus-within:ring-1 focus-within:ring-primary text-primary",
        default:
          "border-gray-800 focus-within:ring-1 focus-within:ring-gray-800 text-gray-800",
        none: "",
      },
      inputSize: {
        sm: "px-1.5 py-1 text-sm",
        md: "px-2 py-1.5",
        lg: "px-4 py-2 text-lg",
      },
      disabled: {
        true: "bg-gray-100 border-gray-400 cursor-not-allowed opacity-70",
        false: "bg-white", // Ensure background is consistent
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "sm",
    },
  },
);

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        className,
        variant,
        inputSize,
        loading = false,
        withSearch = false,
        disabled = false,
        ...props
      },
      ref,
    ) => {
      const isDisabled = !!(loading || disabled);

      return (
        <div
          className={cn(
            inputVariant({ variant, inputSize, disabled: isDisabled }),
            className,
          )}
        >
          {withSearch && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 mr-2 text-gray-400 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          )}

          <input
            {...props}
            ref={ref}
            disabled={isDisabled}
            className="w-full bg-transparent outline-none border-none p-0 placeholder:text-gray-300 disabled:cursor-not-allowed"
          />
        </div>
      );
    },
  ),
);
