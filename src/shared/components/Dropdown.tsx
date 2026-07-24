import { cn } from "@/utils/ClassNames";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "motion/react";
import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  forwardRef,
} from "react";
import { useNavigate } from "react-router-dom";

type AlignType = "right" | "left" | "middle";

interface DropdownProps
  extends
    VariantProps<typeof dropdownVariants>,
    HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  align?: AlignType;
  hasArrowIcon?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnItemClick?: boolean;
  closeOnOutsideClick?: boolean;
  lazyMount?: boolean; // For performance optimization
}

const dropdownVariants = cva(
  "inline-flex items-center gap-1 relative isolate",
  {
    variants: {
      variant: {
        default:
          "bg-transparent dark:bg-transparent/80 text-black dark:text-white/80",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-2",
        primary:
          "bg-primary text-white hover:bg-primary-dark rounded-md px-3 py-2",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

function Dropdown({
  className,
  variant,
  size,
  trigger,
  align = "left",
  children,
  open: controlledOpen,
  hasArrowIcon = true,
  onOpenChange,
  closeOnItemClick = true,
  closeOnOutsideClick = true,
  lazyMount = false,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange],
  );

  const toggleOpen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        closeOnOutsideClick &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [closeOnOutsideClick, setIsOpen],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Memoized dropdown body content
  const dropdownBody = useMemo(
    () => (
      <DropdownBody align={align} open={isOpen}>
        {children}
      </DropdownBody>
    ),
    [align, isOpen, children],
  );

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <motion.button
        ref={triggerRef}
        onClick={toggleOpen}
        className={cn(dropdownVariants({ variant, size }), className)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        {hasArrowIcon && (
          <ChevronDownIcon
            className={cn(
              "size-3 md:size-4 lg:size-5 transition-all duration-200 ease-in-out",
              isOpen && "rotate-180",
            )}
          />
        )}
      </motion.button>

      {lazyMount ? isOpen && dropdownBody : dropdownBody}
    </div>
  );
}

interface DropdownBodyProps extends PropsWithChildren {
  open: boolean;
  align?: AlignType;
  className?: string;
}

function DropdownBody({
  open = false,
  align = "right",
  children,
  className,
}: DropdownBodyProps) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute top-full mt-2 min-w-30 w-max max-w-96 flex flex-col bg-white/80 dark:bg-slate-700/80 backdrop-blur-lg rounded-lg p-1 shadow-lg z-50",
            align === "right" && "right-0",
            align === "left" && "left-0",
            align === "middle" && "left-1/2 -translate-x-1/2",
            className,
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

interface DropdownItemProps
  extends PropsWithChildren, Omit<HTMLAttributes<HTMLLIElement>, "onClick"> {
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  icon?: ReactNode;
  href?: string; // Add href for link items
  active?: boolean; // For active state
  closeOnClick?: boolean; // Individual item override
}

const DropdownItem = forwardRef<HTMLLIElement, DropdownItemProps>(
  (
    {
      children,
      onClick,
      disabled,
      icon,
      href,
      active,
      closeOnClick = true,
      className,
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        // Handle navigation if href is provided
        if (href) {
          e.preventDefault();
          if (typeof href === "string") {
            // For react-router
            navigate(href);
            // OR for regular links:
            // window.location.href = href;
          }
        }

        // Close dropdown
        const dropdownElement = e.currentTarget.closest(".relative");
        const dropdownInstance = dropdownElement?.querySelector(
          '[aria-expanded="true"]',
        );

        if (closeOnClick && dropdownInstance) {
          const triggerButton = dropdownElement?.querySelector(
            'button[aria-haspopup="true"]',
          );
          if (triggerButton) {
            (triggerButton as HTMLButtonElement).click();
          }
        }

        onClick?.(e);
      },
      [disabled, closeOnClick, onClick, href, navigate],
    );

    const content = (
      <>
        {icon && (
          <span className="flex-shrink-0 inline-flex items-center justify-center w-5">
            {icon}
          </span>
        )}
        <span className="flex-1 text-left">{children}</span>
      </>
    );

    const baseClassName = cn(
      "flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all duration-200 ease-in-out",
      "hover:bg-gray-100 dark:hover:bg-gray-600/40",
      "focus:bg-gray-100 dark:focus:bg-gray-600/40 focus:outline-none",
      "text-gray-700 dark:text-gray-200",
      "hover:text-gray-900 dark:hover:text-white",
      "text-left",
      "font-inherit", // Inherit font from parent
      "border-0", // Remove default button border
      "bg-transparent", // Remove default button background
      "cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      active &&
        "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light",
      className,
    );

    return (
      <li ref={ref} className="w-full list-none" {...props}>
        <button
          className={baseClassName}
          onClick={handleClick}
          disabled={disabled}
          role="menuitem"
          type="button"
        >
          {content}
        </button>
      </li>
    );
  },
);

DropdownItem.displayName = "DropdownItem";

// Sub-components for organization
Dropdown.Body = DropdownBody;
Dropdown.Item = DropdownItem;

export default Dropdown;
