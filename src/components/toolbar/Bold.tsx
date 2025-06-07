import { Button } from "../common/form/Button";
import { BoldIcon } from "@heroicons/react/24/outline";
import { HTMLAttributes } from "react";

interface BoldProps extends HTMLAttributes<HTMLButtonElement> {}

export default function Bold({ className, ...rest }: BoldProps) {
  return (
    <Button
      variant={"transparent"}
      className={`p-2 hover:bg-gray-200 rounded-sm ${className}`}
      {...rest}
    >
      <BoldIcon className={"h-5 w-5 text-gray-800"} />
    </Button>
  );
}
