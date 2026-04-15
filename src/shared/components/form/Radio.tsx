import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const radioVariant = cva("", {
  variants: {
    variant: {
      primary:
        "text-primary dark:text-primary-dark focus:ring-primary dark:focus:ring-primary-dark accent-primary dark:accent-primary",
      default: "text-gray-700",
      none: "",
    },
    radioSize: {
      sm: "size-3 md:size-4",
      md: "size-4 md:size-5",
      lg: "size-5 md:size-6",
      xl: "w-6 h-6",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    radioSize: "md",
  },
});

interface RadioProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof radioVariant> {}

/**
 * The Radio component is a custom radio input element that can be used in forms.
 *
 * @param classNames
 * @returns {JSX.Element}
 */

export default function Radio({
  className,
  variant,
  radioSize,
  ...props
}: RadioProps) {
  return (
    <input
      type={"radio"}
      className={cn(radioVariant({ className, variant, radioSize }))}
      {...props}
    />
  );
}
