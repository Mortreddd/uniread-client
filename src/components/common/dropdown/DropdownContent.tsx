import {
  forwardRef,
  HTMLAttributes,
  Ref,
  useImperativeHandle,
  useRef,
} from "react";
import "./dropdown.css";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";

export interface DropdownContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownContentVariant> {}

const dropdownContentVariant = cva(
  "absolute right-0 top-0 bg-gray-100 rounded p-3 hidden",
  {
    variants: {
      size: {
        default: "w-48 h-fit",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DropdownContentRef {
  open: () => void;
  close: () => void;
}

function DropdownContent(
  { className, children, size, ...props }: DropdownContentProps,
  ref: Ref<DropdownContentRef>
) {
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          dropdownContentRef.current?.classList.add("block");
          dropdownContentRef.current?.classList.remove("hidden");
        },
        close() {
          dropdownContentRef.current?.classList.add("hidden");
          dropdownContentRef.current?.classList.remove("block");
        },
      };
    },
    []
  );
  return (
    <div className={"relative"}>
      <div
        ref={dropdownContentRef}
        className={cn(dropdownContentVariant({ className, size }))}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export default forwardRef(DropdownContent);
