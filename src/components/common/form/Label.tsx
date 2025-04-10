import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const labelVariant = cva("", {
  variants: {
    variant: {
      primary: "text-primary",
      default: "text-gray-700",
      none: "",
    },
    labelSize: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      none: "",
    },
  },
});
interface LabelProps
  extends HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariant> {}

/**
 * The label component is used to render a label for an input element.
 * It can be used with any input element and will automatically associate the label with the input element.
 * @param {LabelProps} props - The props for the label component.
 * @returns {JSX.Element} - The label component.
 */

export default function Label({
  className,
  variant,
  labelSize,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(labelVariant({ className, variant, labelSize }))}
      {...props}
    >
      {children}
    </label>
  );
}
