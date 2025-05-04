import { UnderlineIcon } from "@heroicons/react/24/outline";
import { Button, buttonVariants } from "../common/form/Button";
import { HTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

interface UnderlineProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Underline({
  variant = "transparent",
  className,
  ...rest
}: UnderlineProps) {
  return (
    <Button
      variant={variant}
      className={`p-2 hover:bg-gray-200 rounded ${className}`}
      {...rest}
    >
      <UnderlineIcon className="h-5 w-5 text-gray-800" />
    </Button>
  );
}
