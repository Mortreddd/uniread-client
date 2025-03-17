import { PropsWithChildren } from "react";
import Alert from "./Alert";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const dangerAlertVariant = cva("", {
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
interface SuccessAlertProps
  extends PropsWithChildren,
    VariantProps<typeof dangerAlertVariant> {
  className?: string;
  iconSize?: IconSize;
}

export default function SuccessAlert({
  className,
  iconSize,
  children,
}: SuccessAlertProps) {
  return (
    <Alert
      variant={"success"}
      className={`flex items-center gap-2 ${className}`}
    >
      <ExclamationCircleIcon className={cn(dangerAlertVariant({ iconSize }))} />
      {children}
    </Alert>
  );
}
