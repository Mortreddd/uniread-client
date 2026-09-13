import { cn } from "@/utils/ClassNames";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentType } from "react";
const withBadgeVariant = cva(
  "absolute min-w-3 h-3 md:min-w-3.5 md::h-3.5 lg:min-w-4 lg:h-4 px-1 flex items-center justify-center text-[8px] md:text-[9px] lg:text-[10px] text-gray-200 font-thin rounded-full bg-red-600",
  {
    variants: {
      position: {
        topLeft: "top-0 left-0 -translate-x-1/3 -translate-y-1/3 rounded-full",
        topRight: "top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full",
        bottomLeft:
          "bottom-0 left-0 -translate-x-1/3 translate-y-1/3 rounded-full",
        bottomRight:
          "bottom-0 right-0 translate-x-1/3 translate-y-1/3 rounded-full",
      },
    },
    defaultVariants: { position: "topRight" },
  },
);
interface WithBadgeOptions extends VariantProps<typeof withBadgeVariant> {
  className?: string;
  badgeClassName?: string;
}
interface WithBadgeProps {
  badgeContent?: React.ReactNode;
}
function withBadge<P extends object>(
  WrappedComponent: ComponentType<P>,
  options?: WithBadgeOptions,
) {
  return function WithBadgeComponent(props: P & WithBadgeProps) {
    const { badgeContent, ...wrappedProps } = props;
    return (
      <div className="relative inline-block">
        <WrappedComponent {...(wrappedProps as P)} />
        {badgeContent !== undefined && (
          <div
            className={cn(
              withBadgeVariant({ position: options?.position }),
              options?.badgeClassName,
            )}
          >
            {badgeContent}
          </div>
        )}
      </div>
    );
  };
}
export default withBadge;
