import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";

interface SeperatorDotProps extends HTMLAttributes<HTMLSpanElement> {}

export default function SeperatorDot({
  className = "text-gray-400",
  ...props
}: SeperatorDotProps) {
  return (
    <span className={cn(className, "flex-shrink-0")} {...props}>
      &middot;
    </span>
  );
}
