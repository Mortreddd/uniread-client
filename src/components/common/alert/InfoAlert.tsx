import { PropsWithChildren } from "react";
import Alert from "./Alert";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const infoAlertVariant = cva("", {
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
interface InfoAlertProps
  extends PropsWithChildren,
    VariantProps<typeof infoAlertVariant> {
  className?: string;
  iconSize?: IconSize;
}

export default function InfoAlert({
  className,
  iconSize,
  children,
}: InfoAlertProps) {
  return (
    <Alert variant={"info"} className={`flex items-center gap-2 ${className}`}>
      <InformationCircleIcon className={cn(infoAlertVariant({ iconSize }))} />
      {children}
    </Alert>
  );
}
