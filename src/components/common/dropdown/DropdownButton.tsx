import { Fragment, HTMLAttributes } from "react";
import "./dropdown.css";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariant> {}

const dropdownVariant = cva(
  "transition-color px-3 py-2 duration-300 ease-in-out rounded hover:shadow-md cursor-pointer block",
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
function DropdownButton({
  variant,
  children,
  className,
  ...props
}: DropdownProps) {
  return (
    <Fragment>
      <div {...props} className={cn(dropdownVariant({ className, variant }))}>
        <div className="w-fit h-fit flex justify-evenly items-center gap-2">
          <div className="w-fit h-fit flex items-center gap-2">{children}</div>

          <ChevronDownIcon className={`size-4`} />
        </div>
      </div>
    </Fragment>
  );
}

export default DropdownButton;
