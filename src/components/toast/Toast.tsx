import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "motion/react";

interface ToastProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof toastVariants> {}

const toastVariants = cva("rounded p-5 max-w-xl font-serif shadow-lg", {
  variants: {
    variant: {
      primary: "text-white bg-primary",
      warning: "text-white bg-amber-600",
      danger: "text-white bg-red-600",
      info: "text-white bg-blue-600",
      ghost: "text-black bg-gray-200",
      success: "text-white bg-green-600",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export default function Toast({
  className,
  children,
  variant,
  ...rest
}: ToastProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 60,
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{
        opacity: 0,
      }}
      {...rest}
      className={cn(toastVariants({ variant, className }))}
    >
      {children}
    </motion.div>
  );
}
