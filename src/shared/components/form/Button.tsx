import { cn } from "@/utils/ClassNames.ts";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { motion, HTMLMotionProps, Variants } from "motion/react";

// 1. Define Motion Variants for interactions
const buttonAnimations: Variants = {
  initial: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: { scale: 0.95 },
  disabled: { opacity: 0.5, scale: 1, cursor: "not-allowed" },
};

export interface ButtonProps
  extends
    Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const buttonVariants = cva(
  // Removed active:scale-95 and transition-colors because Motion handles this now
  "relative flex items-center justify-center font-medium overflow-hidden cursor-pointer disabled:cursor-disabled",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white dark:bg-primary-dark",
        secondary: "bg-gray-500 text-white dark:bg-gray-700",
        danger: "bg-red-500 text-white dark:bg-red-700",
        warning: "bg-yellow-500 text-white dark:bg-yellow-700",
        success: "bg-green-500 text-white dark:bg-green-700",
        info: "bg-blue-500 text-white dark:bg-blue-700",
        light: "bg-gray-100 text-black dark:bg-gray-300",
        ghost: "bg-transparent text-white dark:text-gray-300",
        dark: "bg-gray-800 text-white dark:bg-gray-900",
        transparent: "bg-transparent text-gray-600 dark:text-gray-300",
        inactivePrimary:
          "border border-primary dark:border-primary-dark text-primary dark:text-primary-dark bg-transparent",
        custom: "",
      },
      size: {
        default: "px-3 py-1.5 md:py-2 md:px-4",
        sm: "px-2 py-1 md:px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-6 py-3",
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
  (
    { className, size, variant, children, loading = false, disabled, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        disabled={loading || disabled}
        // Bind Motion Variants
        variants={buttonAnimations}
        initial="initial"
        whileHover={loading || disabled ? "disabled" : "hover"}
        whileTap={loading || disabled ? "disabled" : "tap"}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {/* Example: Animate content if loading */}
        <motion.span
          animate={{ opacity: loading ? 0 : 1 }}
          className="flex items-center gap-2"
        >
          {children}
        </motion.span>

        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* You can replace this with a Spinner icon */}
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
export { Button };
