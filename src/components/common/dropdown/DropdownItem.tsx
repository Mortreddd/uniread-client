import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { Fragment, HTMLAttributes } from "react";

interface DropdownItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariant> {}

const dropdownItemVariant = cva(
  "text-md transition-color px-3 py-2 duration-300 ease-in-out rounded hover:bg-gray-300 cursor-pointer block",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export default function DropdownItem({
  variant,
  className,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <Fragment>
      <div
        className={cn(dropdownItemVariant({ className, variant }))}
        {...props}
      >
        {children}
      </div>
    </Fragment>
  );
}
