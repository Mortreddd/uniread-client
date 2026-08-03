import { cn } from "@/utils/ClassNames.ts";
import { cva, VariantProps } from "class-variance-authority";
import {
  OptionHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes,
  forwardRef,
} from "react";

interface SelectProps
  extends
    SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariant> {}

const selectVariant = cva(
  "w-full rounded-lg outline-none transition-all duration-200 ease-in-out border focus:ring-2 focus:ring-offset-2  bg-white dark:bg-gray-800 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary/20 hover:border-primary/50",
        default:
          "border-gray-200 dark:border-gray-700 focus:border-gray-400 focus:ring-gray-200 dark:focus:ring-gray-700 hover:border-gray-400",
        ghost:
          "border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-gray-300",
        error:
          "border-red-500 focus:border-red-500 focus:ring-red-500/20 hover:border-red-400",
      },
      selectSize: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-2 py-1 lg:px-4 lg:py-2.5 text-extratiny md:text-tiny lg:text-xs",
        lg: "px-5 py-3.5 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      selectSize: "md",
      fullWidth: true,
    },
  },
);

type SelectComponent = React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLSelectElement>
> & {
  Option: typeof SelectItem;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, selectSize, fullWidth, children, ...props }, ref) => {
    return (
      <div className={cn("relative", fullWidth ? "w-full" : "w-auto")}>
        <div className="relative w-full">
          <select
            ref={ref}
            {...props}
            className={cn(
              selectVariant({ className, variant, selectSize, fullWidth }),
              "appearance-none pr-10",
              "text-gray-900 dark:text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {children}
          </select>

          {/* Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
) as SelectComponent;

Select.displayName = "Select";

interface SelectItemProps
  extends OptionHTMLAttributes<HTMLOptionElement>, PropsWithChildren {}

function SelectItem({ children, className, ...props }: SelectItemProps) {
  return (
    <option
      className={cn(
        "py-2 px-3",
        "bg-white dark:bg-gray-800",
        "text-gray-900 dark:text-gray-100",
        "hover:bg-primary hover:text-white",
        "active:bg-primary/80",
        "transition-colors duration-150",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </option>
  );
}

Select.Option = SelectItem;

export default Select;
