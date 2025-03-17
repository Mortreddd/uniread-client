import { cva, VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";
import Alert from "./Alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils/ClassNames";

const warningAlertVariant = cva("", {
  variants: {
    iconSize: {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      custom: "",
    },
  },
  defaultVariants: {
    iconSize: "sm",
  },
});

type IconSize = "sm" | "md" | "lg" | "custom";
interface WarningAlertProps
  extends PropsWithChildren,
    VariantProps<typeof warningAlertVariant> {
  className?: string;
  iconSize?: IconSize;
}

export default function WarningAlert({
  className,
  iconSize,
  children,
}: WarningAlertProps) {
  return (
    <Alert
      variant={"warning"}
      className={`flex items-center gap-2 ${className}`}
    >
      <ExclamationTriangleIcon
        className={cn(warningAlertVariant({ iconSize }))}
      />
      {children}
    </Alert>
  );
}
