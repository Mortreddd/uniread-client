import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "motion/react";

const alertVariants = cva(
  "rounded-lg p-2 md:p-4 w-full md:min-w-64 h-fit min-w-52 my-1 md:my-2",
  {
    variants: {
      variant: {
        danger: "bg-red-600 text-white",
        success: "bg-green-600 text-white",
        warning: "bg-amber-600 text-white",
        info: "bg-blue-600 text-white",
      },
      position: {
        relative: "relative",
        absolute: "absolute",
      },
    },
    defaultVariants: {
      variant: "info",
      position: "relative",
    },
  }
);

interface AlertVariantsProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof alertVariants> {}
export default function Alert({
  className,
  variant,
  children,
  ...rest
}: AlertVariantsProps) {
  return (
    <motion.div
      initial={{
        translateX: 100,
      }}
      animate={{
        translateX: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
      }}
      className={cn(alertVariants({ className, variant }))}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
