import { HTMLAttributes } from "react";
import { Button, buttonVariants } from "../common/form/Button";
import { VariantProps } from "class-variance-authority";
import { StrikethroughIcon } from "@heroicons/react/24/outline";

interface Strikethrough
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Strikethrough({
  variant = "transparent",
  className,
  ...rest
}: Strikethrough) {
  return (
    <Button
      variant={variant}
      className={`p-2 hover:bg-gray-200 rounded ${className}`}
      {...rest}
    >
      <StrikethroughIcon className="h-5 w-5 text-gray-800" />
    </Button>
  );
}
