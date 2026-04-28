import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

const variants = cva(
  "relative gap-2 md:gap-4 h-fit inline-flex items-center py-0.5 px-2 rounded-full",
  {
    variants: {
      variant: {
        operational: "text-black bg-indigo-200 uppercase",
      },
    },
    defaultVariants: {
      variant: "operational",
    },
  },
);

const circleVariants = cva("rounded-full size-2 md:size-2.5 lg:size-3", {
  variants: {
    circle: {
      operational: "bg-blue-800",
    },
  },
  defaultVariants: {
    circle: "operational",
  },
});

interface SystemStatusBadgeProps
  extends
    PropsWithChildren,
    VariantProps<typeof variants>,
    VariantProps<typeof circleVariants> {}

export default function SystemStatusBadge({
  variant,
  circle,
  children,
}: SystemStatusBadgeProps) {
  return (
    <div className={cn(variants({ variant }))}>
      <span className={cn(circleVariants({ circle }))}></span>
      <span className="text-extratiny md:text-tiny">{children}</span>
    </div>
  );
}
