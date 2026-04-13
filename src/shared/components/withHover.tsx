import { ComponentType, HTMLAttributes } from "react";

interface WithHoverProps extends HTMLAttributes<HTMLDivElement> {}

export default function withHover<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithHoverComponent(props: P & WithHoverProps) {
    return (
      <div className="transition-all hover:opacity-80 duration-300 hover:cursor-pointer ease-in-out transform hover:-translate-y-2 translate-y-0 hover:shadow-md">
        <WrappedComponent {...props} />
      </div>
    );
  };
}
