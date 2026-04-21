import { cn } from "@/utils/ClassNames";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, memo, useState } from "react";

interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "disabled">,
    VariantProps<typeof inputVariant> {
  loading?: boolean;
  withSearch?: boolean;
  withUsername?: boolean;
}

/**
 * The input styles with differnt variants
 */
const inputVariant = cva(
  "inline-flex items-center transition-all rounded-sm  duration-200 ease-in-out border outline-none dark:text-gray-200 text-gray-800 focus-within:ring-offset-background focus-within:ring-offset-2 focus-within:ring-primary focus-within:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        primary:
          "border-primary focus-within:ring-1 focus-within:ring-primary text-primary dark:border-primary-dark dark:disabled:bg-gray-700 dark:disabled:border-gray-600 dark:focus-within:ring-gray-600 dark:disabled:text-gray-400",
        default:
          "border-gray-800 focus-within:ring-1 focus-within:ring-gray-800 text-gray-800 dark:border-gray-700 dark:focus-within:ring-gray-600 dark:text-gray-300 dark:disabled:bg-gray-700 dark:disabled:border-gray-600 dark:disabled:text-gray-400",
        none: "",
      },
      inputSize: {
        xs: "px-1 py-0.5 text-tiny md:text-xs",
        sm: "px-1.5 py-1 text-xs md:text-sm",
        md: "px-1.5 py-1 md:px-2 md:py-1.5 text-sm md:text-base",
        lg: "px-2 py-1.5 md:px-3 md:py-2 text-base md:text-lg",
      },
      disabled: {
        true: "bg-gray-100 border-gray-400 cursor-not-allowed opacity-70",
        false: "bg-white dark:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        className,
        type,
        variant,
        inputSize,
        loading = false,
        withSearch = false,
        withUsername = false,
        disabled = false,
        ...props
      },
      ref,
    ) => {
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const isDisabled = !!(loading || disabled);
      const isPassword = type === "password";

      const inputType = isPassword && showPassword ? "text" : type;

      return (
        <div
          className={cn(
            inputVariant({ variant, inputSize, disabled: isDisabled }),
            className,
          )}
        >
          {withSearch && (
            <MagnifyingGlassIcon
              stroke={"currentColor"}
              className={
                "size-4 text-primary shrink-0 mr-2 dark:text-primary-dark"
              }
            />
          )}

          {withUsername && (
            <AtSymbolIcon
              stroke={"currentColor"}
              className={
                "size-4 text-primary shrink-0 mr-2 dark:text-primary-dark"
              }
            />
          )}

          <input
            {...props}
            ref={ref}
            type={inputType}
            disabled={isDisabled}
            className="w-full bg-transparent text-xs sm:text-sm md:text-base outline-none border-none p-0 placeholder:text-gray-300 dark:placeholder:text-gray-600 disabled:cursor-not-allowed"
          />

          {isPassword &&
            (showPassword ? (
              <EyeSlashIcon
                onClick={() => setShowPassword((v) => !v)}
                className="size-4 ml-1 shrink-0 text-primary hover:text-primary/70 cursor-pointer active:scale-95 opacity-85"
              />
            ) : (
              <EyeIcon
                onClick={() => setShowPassword((v) => !v)}
                className="size-4 ml-1 shrink-0 text-primary hover:text-primary/70 cursor-pointer active:scale-95 opacity-85"
              />
            ))}
        </div>
      );
    },
  ),
);
