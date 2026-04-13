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
} from "react";

type AlignType = "right" | "left" | "middle";
interface DropdownProps
  extends
    VariantProps<typeof dropdownVariants>,
    HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode;
  align?: AlignType;
}

const dropdownVariants = cva(
  "inline-flex items-center gap-1 relative isolate",
  {
    variants: {
      variant: {
        default:
          "bg-transparent dark:bg-transparent/80 text-black dark:text-white/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Dropdown({
  className,
  variant,
  trigger,
  align = "left",
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(dropdownVariants({ variant }), className)}
        type="button"
      >
        {trigger}
        <ChevronDownIcon
          className={cn(
            "size-3 md:size-4 transition-all duration-200 ease-in-out hover:cursor-pointer",
            isOpen && "rotate-180",
          )}
        />
      </motion.button>
      <DropdownBody align={align} open={isOpen}>
        {children}
      </DropdownBody>
    </div>
  );
}

interface DropdownBodyProps extends PropsWithChildren {
  open: boolean;
  align?: AlignType;
}

function DropdownBody({
  open = false,
  align = "right",
  children,
}: DropdownBodyProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute top-full mt-2 min-w-30 w-max max-w-96 flex flex-col bg-white/80 dark:bg-slate-700/80 backdrop-blur-lg rounded-lg p-2 shadow-lg z-50 active:opacity-95 active:scale-90",
            align === "right" ? "right-0" : "left-0",
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
  extends PropsWithChildren, HTMLAttributes<HTMLLIElement> {
  onClick?: () => void;
  disabled?: boolean;
}

function DropdownItem({ children, ...props }: DropdownItemProps) {
  return (
    <li
      className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      {...props}
    >
      {children}
    </li>
  );
}

Dropdown.Body = DropdownBody;
Dropdown.Item = DropdownItem;

export default Dropdown;
