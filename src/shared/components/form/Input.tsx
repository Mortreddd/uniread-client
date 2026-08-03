import { cn } from "@/utils/ClassNames";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, memo, useState, useId } from "react";

interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "disabled" | "size">,
    VariantProps<typeof inputVariant> {
  loading?: boolean;
  limit?: number;
  regexPattern?: string;
  withSearch?: boolean;
  withUsername?: boolean;
  label?: string;
  error?: string;
}

const inputVariant = cva(
  "inline-flex items-center transition-all rounded-sm duration-200 ease-in-out border outline-none dark:text-gray-200 text-gray-800 focus-within:ring-offset-background focus-within:ring-offset-2 focus-within:ring-primary focus-within:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        primary:
          "border-primary focus-within:ring-1 focus-within:ring-primary text-primary dark:border-primary-dark dark:disabled:bg-gray-700 dark:disabled:border-gray-600 dark:focus-within:ring-gray-600 dark:disabled:text-gray-400",
        default:
          "border-gray-800 focus-within:ring-1 focus-within:ring-gray-800 text-gray-800 dark:border-gray-700 dark:focus-within:ring-gray-600 dark:text-gray-300 dark:disabled:bg-gray-700 dark:disabled:border-gray-600 dark:disabled:text-gray-400",
        error:
          "border-red-500 focus-within:ring-1 focus-within:ring-red-500 text-red-500",
        none: "",
      },
      inputSize: {
        xs: "px-1 py-0.5 text-tiny md:text-xs",
        sm: "px-1.5 py-1 md:px-2 md:py-1.5  text-xs md:text-sm",
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
        type = "text",
        variant,
        inputSize,
        loading = false,
        limit = 900,
        regexPattern,
        withSearch = false,
        withUsername = false,
        disabled = false,
        label,
        error,
        id,
        onChange,
        ...props
      },
      ref,
    ) => {
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const generatedId = useId();
      const inputId = id || generatedId;

      const isDisabled = !!(loading || disabled);
      const isPassword = type === "password";
      const inputType = isPassword && showPassword ? "text" : type;

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (limit && e.target.value.length > limit) {
          e.preventDefault();
          return;
        }
        if (!regexPattern) {
          onChange?.(e);
          return;
        }

        try {
          const pattern = new RegExp(regexPattern);
          const value = e.target.value;
          if (pattern.test(value) || value === "") {
            onChange?.(e);
          }
        } catch (error) {
          console.warn("Invalid regex pattern:", regexPattern);
          onChange?.(e);
        }
      };

      const togglePasswordVisibility = () => {
        setShowPassword((v) => !v);
      };

      return (
        <div className="w-full">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {label}
            </label>
          )}
          {error && (
            <p
              id={`${inputId}-error`}
              className="text-extratiny md:text-tiny lg:text-xs text-red-500"
              role="alert"
            >
              {error}
            </p>
          )}

          <div
            className={cn(
              inputVariant({
                variant: error ? "error" : variant,
                inputSize,
                disabled: isDisabled,
              }),
              className,
            )}
          >
            {withSearch && (
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="size-3 md:size-4 lg:size-5 text-gray-800 dark:text-gray-200 shrink-0 mr-2"
              />
            )}

            {withUsername && (
              <AtSymbolIcon
                aria-hidden="true"
                className="size-3 md:size-4 lg:size-5 text-gray-800 dark:text-gray-200 shrink-0 mr-2"
              />
            )}

            <input
              {...props}
              ref={ref}
              id={inputId}
              type={inputType}
              disabled={isDisabled}
              onChange={handleInputChange}
              aria-invalid={!!error}
              aria-describedby={error ? `${inputId}-error` : undefined}
              className="w-full bg-transparent text-xs sm:text-sm md:text-base outline-none border-none p-0 placeholder:text-gray-300 dark:placeholder:text-gray-600 disabled:cursor-not-allowed"
            />

            {isPassword && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-1 shrink-0 text-gray-900 dark:text-gray-100 hover:opacity-100 active:scale-95 opacity-85 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeSlashIcon className="size-4 md:size-5 lg:size-6" />
                ) : (
                  <EyeIcon className="size-4 md:size-5 lg:size-6" />
                )}
              </button>
            )}
          </div>
        </div>
      );
    },
  ),
);

Input.displayName = "Input";
