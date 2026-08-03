import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, Ref, TextareaHTMLAttributes } from "react";

interface TextAreaProps
  extends
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
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
  { rows = 3, variant, className, error, ...props }: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  return (
    <div className="w-full">
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          textareaVariants({ variant }),

          // base styles
          "px-2.5 py-1.5 text-sm md:text-base",
          "text-gray-900 dark:text-gray-100",
          "caret-gray-900 dark:caret-gray-100",

          // default border
          !error && "border-gray-300 dark:border-gray-700",

          // ❌ error styles
          error &&
            "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500",

          className,
        )}
        {...props}
      />

      {/* ✅ Error message */}
      {error && <p className="mt-1 text-xs md:text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default forwardRef(TextArea);
