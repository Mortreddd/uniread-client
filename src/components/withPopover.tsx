import { ComponentType, Fragment } from "react";
import Popover, { WithPopoverProps } from "@/components/Popover.tsx";

export default function withPopover<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithPopoverProps
) {
  return function WithPopoverComponent(props: P) {
    return (
      <Fragment>
        <Popover {...options}>
          <WrappedComponent {...props} />
        </Popover>
      </Fragment>
    );
  };
}
