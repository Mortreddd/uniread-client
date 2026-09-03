import { Button, ButtonProps } from "@/shared/components/form/Button.tsx";
import { H2Icon } from "@heroicons/react/24/outline";

export default function H2({
  variant = "transparent",
  className,
  ...rest
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      className={`p-1 md:p-1.5 lg:p-2 hover:bg-gray-200 rounded-sm ${className}`}
      {...rest}
    >
      <H2Icon className={"size-4 md:size-5 text-gray-800 dark:text-gray-200"} />
    </Button>
  );
}
