import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const toggleVariant = cva(
  "flex items-center shrink-0 ml-4 p-0.5 bg-gray-300 rounded-full after:rounded-full after:shadow-md after:duration-200 peer-checked:after:translate-x-6 ease-in-out",
  {
    variants: {
      variant: {
        primary: "after:bg-white peer-checked:bg-primary",
      },
      toggleSize: {
        md: "w-12 h-6 after:w-5 after:h-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      toggleSize: "md",
    },
  }
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
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof toggleVariant> {}

export default function Toggle({ className, ...props }: ToggleProps) {
  return (
    <label className={"relative flex items-center cursor-pointer"}>
      <input type="checkbox" className="appearance-none peer" {...props} />
      <span className={cn(toggleVariant({ className }))}></span>
    </label>
  );
}
