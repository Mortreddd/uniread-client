import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const radioVariant = cva("", {
  variants: {
    variant: {
      primary: "text-primary focus:ring-primary accent-primary",
      default: "text-gray-700",
      none: "",
    },
    radioSize: {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
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
  extends InputHTMLAttributes<HTMLInputElement>,
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
