import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

function Tab({ className, isActive = false, children, ...rest }: TabProps) {
  return (
    <div
      {...rest}
      className={cn(
        className,
        "border-solid p-2 md:p-3 overflow-hidden rounded-t",
        isActive
          ? "border-0 border-primary bg-primary text-white"
          : "border-b-2 border-primary bg-transparent text-black dark:text-white",
      )}
    >
      {children}
    </div>
  );
}

interface TabContentProps extends HTMLAttributes<HTMLDivElement> {}
function TabContent({ children, ...rest }: TabContentProps) {
  return <div {...rest}>{children}</div>;
}

Tab.Content = TabContent;

export default Tab;
