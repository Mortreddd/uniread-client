import { cn } from "@/utils/ClassNames.ts";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
}

const buttonVariants = cva(
  "active:scale-95 transition-colors hover:cursor-pointer font-medium duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary hover:bg-primary/80 text-white dark:text-white dark:bg-primary-dark dark:hover:bg-primary-dark/80",
        secondary:
          "bg-gray-500 hover:bg-gray-600 text-white dark:bg-gray-700 dark:hover:bg-gray-800",
        danger:
          "bg-red-500 hover:bg-red-600 text-white dark:bg-red-700 dark:hover:bg-red-800",
        warning:
          "bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800",
        success:
          "bg-green-500 hover:bg-green-600 text-white dark:bg-green-700 dark:hover:bg-green-800",
        info: "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-700 dark:hover:bg-blue-800",
        light:
          "bg-gray-100 hover:bg-gray-200 text-black dark:bg-gray-300 dark:hover:bg-gray-400 dark:text-black",
        ghost:
          "bg-transparent hover:bg-gray-100 text-white dark:text-gray-300 dark:hover:bg-gray-700",
        dark: "bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-900 dark:hover:bg-gray-900/80",
        transparent:
          "bg-transparent hover:bg-transparent/30 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/30",
        inactivePrimary:
          "border border-primary text-primary  bg-transparent hover:bg-primary/10 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark/10",
        custom: "",
      },
      size: {
        default: "px-3 py-1 md:py-2 md:px-4",
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, loading = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  },
);
export { Button, buttonVariants };
