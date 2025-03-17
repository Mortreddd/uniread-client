import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentType } from "react";
import React from "react";

const withBadgeVariant = cva("absolute p-1.5", {
  variants: {
    position: {
      topLeft: "absolute top-0 left-0 rounded-full",
      topRight: "absolute top-0 right-0 rounded-full",
      bottomLeft: "absolute bottom-0 left-0 rounded-full",
      bottomRight: "absolute bottom-0 right-0 rounded-full",
    },
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-gray-200 text-gray-800",
      success: "bg-green-500 text-white",
      danger: "bg-red-500 text-white",
      warning: "bg-amber-500 text-white",
      info: "bg-blue-500 text-white",
      light: "bg-gray-100 text-gray-800",
      dark: "bg-gray-800 text-white",
    },
  },
  defaultVariants: {
    position: "topRight",
    variant: "primary",
  },
});

interface WithBadgeOptions
    extends VariantProps<typeof withBadgeVariant> {
  badgeContent?: React.ReactNode;
  badgeClassName?: string;
}

function withBadge<P extends object>(
    WrappedComponent: ComponentType<P>,
    options: WithBadgeOptions
) {
  return function WithBadgeComponent(props: P) {
    const { position, variant, badgeContent, badgeClassName } = options;

    return (
        <div className="relative inline-block">
          <WrappedComponent {...props} />
              <div
                  className={cn(
                      withBadgeVariant({ position, variant }),
                      badgeClassName
                  )}
              >
                {badgeContent}
              </div>
        </div>
    );
  };
}

export default withBadge;
