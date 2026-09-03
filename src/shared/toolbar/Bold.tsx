import { Button, ButtonProps } from "@/shared/components/form/Button.tsx";
import { BoldIcon } from "@heroicons/react/24/outline";

export default function Bold({ className, ...rest }: ButtonProps) {
  return (
    <Button
      variant={"transparent"}
      className={`p-1 md:p-1.5 lg:p-2 rounded-sm ${className}`}
      {...rest}
    >
      <BoldIcon
        className={"size-4 md:size-5 text-gray-800 dark:text-gray-200"}
      />
    </Button>
  );
}
