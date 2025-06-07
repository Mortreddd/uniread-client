import { VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { Button, buttonVariants } from "../common/form/Button";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface TextJustifyProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
export default function TextJustify({
  variant = "transparent",
  className,
  ...rest
}: TextJustifyProps) {
  return (
    <Button
      variant={variant}
      className={`p-2 hover:bg-gray-200 rounded-sm ${className}`}
      {...rest}
    >
      <Bars3Icon className="h-5 w-5 text-gray-800" />
    </Button>
  );
}
