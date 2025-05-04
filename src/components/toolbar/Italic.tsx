import { HTMLAttributes } from "react";
import { Button, buttonVariants } from "../common/form/Button";
import { ItalicIcon } from "@heroicons/react/24/outline";
import { VariantProps } from "class-variance-authority";

interface ItalicProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Italic({
  variant = "transparent",
  className,
  ...rest
}: ItalicProps) {
  return (
    <Button
      variant={variant}
      className={`p-2 hover:bg-gray-200 rounded ${className}`}
      {...rest}
    >
      <ItalicIcon className={"h-5 w-5 text-gray-800"} />
    </Button>
  );
}
