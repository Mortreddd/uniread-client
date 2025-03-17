import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, Ref } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariant> {}

const inputVariant = cva(
  "inline-flex outline-0 justify-start py-1 px-2 items-center transition-colors rounded font-medium focus:border-2 duration-200 ease-in-out placeholder:text-gray-500",
  {
    variants: {
      variant: {
        primary:
          "text-primary ring-primary focus:ring-primary border-1 ring-1 focus:border-primary",
        default:
          "text-gray-700 border-2 border-gray-300 ring-0 focus:ring-2 focus:ring-gray-300 focus:border-gray-400 focus:border-2",
        none: "text-gray-500 ring-0 focus:ring-0 focus:border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Input(
  { className, variant, ...props }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(inputVariant({ className, variant }))}
    />
  );
}

export default forwardRef(Input);
