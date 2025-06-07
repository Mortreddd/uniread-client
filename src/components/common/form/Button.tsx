import { cn } from "@/utils/ClassNames";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const buttonVariants = cva(
  "active:scale-95 transition-colors hover:cursor-pointer font-medium duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/80 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
        success: "bg-green-500 hover:bg-green-600 text-white",
        info: "bg-blue-500 hover:bg-blue-600 text-white",
        light: "bg-gray-100 hover:bg-gray-200 text-black",
        ghost: "bg-transparent hover:bg-gray-100 text-white",
        dark: "bg-gray-800 hover:bg-gray-900 text-white",
        transparent: "bg-transparent hover:bg-transparent/30",
        inactivePrimary:
          "border border-primary text-primary bg-transparent hover:bg-primary/10",
        custom: "",
      },
      size: {
        default: "py-2 px-4",
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
  }
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
  }
);
export { Button, buttonVariants };
