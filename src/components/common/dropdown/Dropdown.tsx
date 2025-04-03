import {forwardRef, HTMLAttributes, Ref, useImperativeHandle, useRef} from "react";
import "./dropdown.css";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

/**
 * The parent dropdown
 */
interface DropdownProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariant> {}

const dropdownVariant = cva(
  "transition-color px-3 py-2 duration-300 ease-in-out rounded hover:shadow-md cursor-pointer block",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
const  Dropdown = ({ variant, children, className, ...props }: DropdownProps) =>  {
  return (
      <div {...props} className={cn(dropdownVariant({ className, variant }))}>
        <div className="w-fit h-fit flex justify-evenly items-center gap-2">
          <div className="w-fit h-fit flex items-center gap-2">{children}</div>
            <ChevronDownIcon className={'size-4'} />
        </div>
      </div>
  );
}


const DropdownAvatar = () => {

}

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
                onClick={e => e.stopPropagation()}
                {...props}
            >
                {children}
            </div>
        </div>
    );
}


interface DropdownItemProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof dropdownItemVariant> {}

const dropdownItemVariant = cva(
    "transition-all px-2 py-1 duration-300 ease-in-out rounded hover:bg-gray-300 cursor-pointer block",
    {
        variants: {
            variant: {
                default: "bg-transparent hover:bg-gray-200 text-md ",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);
const DropdownItem = ({ variant, className, children, ...props }: DropdownItemProps) => {
    return (
        <div className={cn(dropdownItemVariant({ className, variant }))} {...props}>
            {children}
        </div>
    );
}

Dropdown.Avatar = DropdownAvatar
Dropdown.Content = forwardRef(DropdownContent);
Dropdown.Item = DropdownItem;

export default Dropdown;
