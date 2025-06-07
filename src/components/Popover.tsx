import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, useRef } from "react";

export interface WithPopoverProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof withPopoverVariant> {}

const withPopoverVariant = cva(
  "py-2 px-4 rounded-sm bg-gray-200 shadow-md w-full h-full hidden transition-all duration-300 ease-in-out translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-gray-200",
      },
      position: {
        top: "top-0",
        bottom: "bottom-0",
        left: "left-0",
        right: "right-0",
      },
    },

    defaultVariants: {
      variant: "default",
      position: "bottom",
    },
  }
);

export default function Popover({
  className,
  position,
  variant,
  children,
  ...props
}: WithPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 1000;

  function onMouseEnter() {
    timeoutRef.current = setTimeout(() => {
      popoverRef.current?.classList.remove("hidden", "-translate-y-8");
      popoverRef.current?.classList.add("translate-y-0");
    }, delay);
  }

  function onMouseLeave() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    popoverRef.current?.classList.remove("translate-y-0");
    popoverRef.current?.classList.add("-translate-y-8", "hidden");
  }

  return (
    <div
      className="min-w-12 min-h-8 rounded-sm absolute"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={popoverRef}
        className={cn(withPopoverVariant({ className, position, variant }))}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
