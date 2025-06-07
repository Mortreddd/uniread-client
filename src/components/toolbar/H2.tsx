import { HTMLAttributes } from "react";
import { Button, buttonVariants } from "../common/form/Button";
import { H2Icon } from "@heroicons/react/24/outline";
import { VariantProps } from "class-variance-authority";

interface H2Props
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function H2({
  variant = "transparent",
  className,
  ...rest
}: H2Props) {
  return (
    <Button
      variant={variant}
      className={`p-2 hover:bg-gray-200 rounded-sm ${className}`}
      {...rest}
    >
      <H2Icon className={"h-5 w-5 text-gray-800"} />
    </Button>
  );
}
