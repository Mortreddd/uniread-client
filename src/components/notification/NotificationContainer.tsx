import { Notification } from "@/types/Notification";
import DropdownContent, {
  DropdownContentProps,
  DropdownContentRef,
} from "../common/dropdown/DropdownContent";
import { forwardRef, Ref } from "react";
import { cn } from "@/utils/ClassNames";
import NotificationRow from "./NotificationRow";

interface NotificationContainerProps extends DropdownContentProps {
  notifications?: Notification[];
}

function NotificationContainer(
  { className, notifications, ...rest }: NotificationContainerProps,
  ref: Ref<DropdownContentRef>
) {
  return (
    <DropdownContent
      ref={ref}
      className={cn("bg-white rounded min-h-44", className)}
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
    </DropdownContent>
  );
}

export default forwardRef(NotificationContainer);
