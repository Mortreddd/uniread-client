import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";

interface SeperatorDotProps extends HTMLAttributes<HTMLSpanElement> {}

export default function SeperatorDot({
  className,
  ...props
}: SeperatorDotProps) {
  return (
    <span className={cn(className, "text-gray-400 flex-shrink-0")} {...props}>
      &middot;
    </span>
  );
}
