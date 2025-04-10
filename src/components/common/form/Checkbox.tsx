import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const checkboxVariant = cva("", {
  variants: {
    variant: {
      primary: "text-primary focus:ring-primary accent-primary",
      default: "text-gray-700",
      none: "",
    },
    checkboxSize: {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    checkboxSize: "md",
  },
});

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariant> {}

/**
 *
 * Checkbox component is a custom checkbox input element that can be used in forms.
 *
 * @param className
 * @param variant
 * @param checkboxSize
 * @returns {JSX.Element}
 */

export default function Checkbox({
  className,
  variant,
  checkboxSize,
  ...props
}: CheckboxProps) {
  return (
    <input
      type={"checkbox"}
      className={cn(checkboxVariant({ className, variant, checkboxSize }))}
      {...props}
    />
  );
}
