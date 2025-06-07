import { Notification } from "@/types/Notification";

import { forwardRef, Ref } from "react";
import { cn } from "@/utils/ClassNames";
import NotificationRow from "./NotificationRow";
import Dropdown, {DropdownContentProps, DropdownContentRef} from "@/components/common/dropdown/Dropdown.tsx";

interface NotificationContainerProps extends DropdownContentProps {
  notifications?: Notification[];
}

function NotificationContainer(
  { notifications, className, ...rest }: NotificationContainerProps,
  ref: Ref<DropdownContentRef>
) {
  return (
    <Dropdown.Content
      ref={ref}
      className={cn("bg-white rounded-sm min-h-44", className)}
      {...rest}
    >
      {notifications ? (
        notifications?.map((notification, key) => (
          <NotificationRow
            key={key}
            notification={notification}
          ></NotificationRow>
        ))
      ) : (
        <div>No notification</div>
      )}
    </Dropdown.Content>
  );
}

export default forwardRef(NotificationContainer);
