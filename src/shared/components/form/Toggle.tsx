import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const toggleVariant = cva(
  "flex items-center shrink-0 p-0.5 bg-gray-300 dark:bg-slate-600 rounded-full after:rounded-full after:shadow-md after:duration-200 ease-in-out",
  {
    variants: {
      variant: {
        primary:
          "after:bg-gray-100 peer-checked:bg-primary dark:peer-checked:bg-primary-dark",
      },
      toggleSize: {
        md: "w-8 h-4 after:w-3 after:h-3 peer-checked:after:translate-x-4 md:w-12 md:h-6 md:after:w-5 md:after:h-5 md:peer-checked:after:translate-x-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      toggleSize: "md",
    },
  },
);

/**
 *
 * Toggle component is a custom toggle input element that can be used in forms.
 *
 * @param className
 * @param variant
 * @param toggleSize
 * @returns {JSX.Element}
 */

interface ToggleProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof toggleVariant> {}

export default function Toggle({
  className,
  variant,
  toggleSize,
  ...props
}: ToggleProps) {
  return (
    <label className={"relative inline-flex items-center cursor-pointer"}>
      <input type="checkbox" className="appearance-none peer" {...props} />
      <span
        className={cn(toggleVariant({ variant, toggleSize }), className)}
      ></span>
    </label>
  );
}
