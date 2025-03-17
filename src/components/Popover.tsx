import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { Fragment, HTMLAttributes, useRef } from "react";

export interface WithPopoverProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof withPopoverVariant> {}

const withPopoverVariant = cva(
  "py-2 px-4 rounded bg-gray-200 shadow-md w-full h-full hidden transition-all duration-300 ease-in-out translate-y-0",
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

  // The delay of the popover
  const delay: number = 1000;
  function onMouseEnter() {
    const timeout = setTimeout(() => {
      popoverRef.current?.classList.remove("hidden");
      popoverRef.current?.classList.replace("-translate-y-8", "translate-y-0");
    }, delay);

    return () => clearTimeout(timeout);
  }

  function onMouseLeave() {
    popoverRef.current?.classList.remove("translate-y-0");
    popoverRef.current?.classList.add("-translate-y-8");
    popoverRef.current?.classList.add("hidden");
  }
  return (
    <Fragment>
      <div
        className="min-w-12 min-h-8 rounded absolute"
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
    </Fragment>
  );
}
