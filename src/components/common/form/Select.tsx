import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import {
  OptionHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes,
} from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariant> {}

/**
 * Select component for selecting options
 * @param props - Select props
 * @returns {JSX.Element} Select component
 */

const selectVariant = cva("border focus:ring-1 outline-0 rounded-sm", {
  variants: {
    variant: {
      primary: "text-primary border border-primary focus:ring-primary",
      default:
        "text-gray-900 border-gray-300 focus:ring-gray-500 focus:border-gray-500",
      none: "",
    },
    selectSize: {
      md: "px-2 py-1",
      lg: "px-4 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    selectSize: "md",
  },
});

function Select({
  className,
  variant,
  selectSize,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={cn(selectVariant({ className, variant, selectSize }))}
    >
      {children}
    </select>
  );
}

interface SelectItemProps
  extends OptionHTMLAttributes<HTMLOptionElement>,
    PropsWithChildren {}

function SelectItem({ children, ...props }: SelectItemProps) {
  return (
    <option
      className={
        "bg-white hover:bg-primary duration-200 ease-in-out active:bg-primar select:text-white transition all text-gray-700 hover:text-white"
      }
      {...props}
    >
      {children}
    </option>
  );
}

Select.Option = SelectItem;

export default Select;
