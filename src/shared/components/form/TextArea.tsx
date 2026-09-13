import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, Ref, TextareaHTMLAttributes, useState } from "react";

interface TextAreaProps
  extends
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  showLimitIndicator?: boolean;
  limit?: number;
}

const textareaVariants = cva(
  "w-full rounded-sm md:rounded-md border bg-white dark:bg-gray-800 outline-none transition-all duration-200 ease-in-out focus:ring-1",
  {
    variants: {
      variant: {
        primary:
          "border-primary focus:ring-primary dark:border-primary-dark dark:focus:ring-primary-dark",
        default:
          "border-gray-300 focus:ring-gray-500 dark:border-gray-700 dark:focus:ring-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
function TextArea(
  {
    rows = 3,
    variant,
    className,
    value,
    onChange,
    limit = 900,
    showLimitIndicator = false,
    error,
    ...props
  }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  const [charCount, setCharCount] = useState<number>(0);

  const currentCount = typeof value === "string" ? value.length : charCount;
  const isNearLimit = currentCount > limit * 0.9;
  const isAtLimit = currentCount >= limit;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newLength = newValue.length;

    if (limit && newLength > limit) {
      e.preventDefault();
      return;
    }

    setCharCount(newLength);
  };
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        rows={rows}
        onChange={handleChange}
        className={cn(
          textareaVariants({ variant }),

          "px-1.5 py-1 lg:px-2.5 lg:py-1.5 text-sm md:text-base",
          "text-gray-900 dark:text-gray-100",
          "caret-gray-900 dark:caret-gray-100",

          !error && "border-gray-300 dark:border-gray-700",

          error &&
            "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500",

          className,
        )}
        {...props}
      />

      {error && (
        <p className="mt-1 text-extratiny md:text-tiny lg:text-xs md:text-sm text-red-500">
          {error}
        </p>
      )}
      {showLimitIndicator && (
        <div className="flex justify-end mt-0.5 lg:mt-1">
          <span
            className={cn(
              "text-[9px] md:text-[10px] lg:text-xs transition-colors duration-200",
              isAtLimit && "text-red-500 font-medium",
              isNearLimit && !isAtLimit && "text-yellow-500",
              !isNearLimit && "text-gray-400 dark:text-gray-500",
            )}
          >
            {currentCount} / {limit}
          </span>
        </div>
      )}
    </div>
  );
}

export default forwardRef(TextArea);
