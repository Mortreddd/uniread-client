import { cn } from "@/utils/ClassNames.ts";
import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

interface Option<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps<T = string> {
  options: Option<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "default" | "ghost" | "error";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  hasSearch?: boolean;
  label?: string;
  error?: string;
  required?: boolean;
}

interface CustomSelectRef {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
}

function CustomSelectInner<T = string>(
  {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    className,
    variant = "primary",
    size = "md",
    fullWidth = true,
    hasSearch = false,
    label,
    error,
    required,
  }: CustomSelectProps<T>,
  ref: React.ForwardedRef<CustomSelectRef>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = searchTerm
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  useImperativeHandle(ref, () => ({
    focus: () => buttonRef.current?.focus(),
    blur: () => buttonRef.current?.blur(),
    getValue: () => String(selectedValue ?? ""),
  }));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearchTerm("");
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const availableOptions = filteredOptions.filter((opt) => !opt.disabled);

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < availableOptions.length - 1 ? prev + 1 : prev,
          );
          break;

        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;

        case "Enter":
          event.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < availableOptions.length
          ) {
            const selected = availableOptions[highlightedIndex];
            if (selected) {
              handleSelect(selected.value);
            }
          }
          break;

        case " ":
          event.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < availableOptions.length
          ) {
            const selected = availableOptions[highlightedIndex];
            if (selected) {
              handleSelect(selected.value);
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (value: T) => {
    if (isControlled) {
      onChange?.(value);
    } else {
      setInternalValue(value);
      onChange?.(value);
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
    setSearchTerm("");
    buttonRef.current?.focus();
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHighlightedIndex(-1);
        setSearchTerm("");
        setTimeout(() => {
          if (hasSearch && searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }, 100);
      }
    }
  };

  // Size variants
  const sizeClasses = {
    sm: "px-1.5 py-0.5 md:px-2.5 md:py-1 lg:px-3 lg:py-1.5 text-extratiny md:text-tiny lg:text-xs",
    md: "px-2 py-1 md:py-3 md:py-1.5 lg:px-4 lg:py-2.5 text-tiny md:text-xs lg:text-sm",
    lg: "px-5 py-3.5 text-base",
  };

  // Updated variant styles with more visible borders
  const variantClasses = {
    primary: {
      base: "border-gray-900 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/70", // Made border darker
      menu: "border-primary/20",
    },
    default: {
      base: "border-gray-900 dark:border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 hover:border-gray-500", // Made border darker
      menu: "border-gray-200 dark:border-gray-700",
    },
    ghost: {
      base: "border-gray-900 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:border-gray-500", // Added visible border
      menu: "border-gray-200 dark:border-gray-700",
    },
    error: {
      base: "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 hover:border-red-600",
      menu: "border-red-500",
    },
  };

  const selectedVariant = variantClasses[variant] || variantClasses.default;

  return (
    <div className={cn(fullWidth ? "w-full" : "w-auto", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div ref={containerRef} className="relative hover:cursor-pointer">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleOpen}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          aria-label={label || placeholder}
          className={cn(
            "w-full rounded outline-none transition-all duration-200 ease-in-out border",
            "bg-white dark:bg-gray-800",
            "text-left flex items-center justify-between",
            "text-gray-900 dark:text-white",
            sizeClasses[size],
            selectedVariant.base,
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500 focus:border-red-500",
            "focus:outline-none focus:ring-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Add a subtle shadow when not focused to make border more visible
            "shadow-sm",
            // When open, keep the border visible
            isOpen && "border-primary dark:border-primary",
          )}
        >
          <span
            className={cn(
              "truncate",
              !selectedOption && "text-gray-400 dark:text-gray-500",
              selectedOption && "text-gray-900 dark:text-white",
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-3"
          >
            <svg
              className="h-4 w-4 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute z-50 w-full mt-1.5",
                "bg-white dark:bg-gray-800",
                "rounded-lg shadow-lg border",
                selectedVariant.menu,
                "overflow-hidden",
              )}
              role="listbox"
              ref={listRef}
            >
              {hasSearch && (
                <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setHighlightedIndex(-1);
                    }}
                    className={cn(
                      "w-full px-3 py-1.5 text-sm rounded-md",
                      "bg-gray-50 dark:bg-gray-700",
                      "text-gray-900 dark:text-white",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                      "border border-gray-200 dark:border-gray-600",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    )}
                  />
                </div>
              )}
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                    No options available
                  </div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = selectedValue === option.value;
                    const isHighlighted = highlightedIndex === index;

                    return (
                      <motion.div
                        key={String(option.value)}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        className={cn(
                          "px-4 py-2.5 text-sm cursor-pointer",
                          "transition-colors duration-150",
                          "flex items-center justify-between",
                          isSelected && "bg-primary text-white",
                          isHighlighted &&
                            !isSelected &&
                            "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
                          !isSelected &&
                            !isHighlighted &&
                            "text-gray-900 dark:text-white",
                          option.disabled && "opacity-50 cursor-not-allowed",
                          !option.disabled &&
                            !isSelected &&
                            "hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                        )}
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="h-4 w-4 flex-shrink-0 ml-2 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}

const CustomSelect = forwardRef(CustomSelectInner) as <T = string>(
  props: CustomSelectProps<T> & { ref?: React.ForwardedRef<CustomSelectRef> },
) => ReturnType<typeof CustomSelectInner>;

export default CustomSelect;
