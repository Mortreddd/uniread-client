import Popover from "@/components/Popover";
import NotificationContainer from "../../notification/NotificationContainer";
import { useRef, useState } from "react";
import { DropdownContentRef } from "./DropdownContent";
import withBadge from "@/components/withBadge";
import { Button } from "../form/Button";
import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationDropdown() {
  const [open, setOpen] = useState<boolean>(false);

  const notificationContentRef = useRef<DropdownContentRef>(null);

  const ButtonWithBadge = withBadge(Button, {
    variant: "danger",
    position: "topRight",
    badgeClassName: "rounded-full text-sm",
  });

  function handleNotificationClick() {
    if (open) {
      notificationContentRef.current?.close();
    } else {
      notificationContentRef.current?.open();
    }

    setOpen(!open);
  }

  return (
    <>
      <ButtonWithBadge
        variant={"light"}
        size={"custom"}
        className={"rounded-full p-3"}
        onClick={handleNotificationClick}
      >
        <BellIcon className={"size-5"} />
        <Popover position={"top"}>
          <h3 className="text-xs font-sans text-black">Notifcations</h3>
        </Popover>
      </ButtonWithBadge>
      <NotificationContainer ref={notificationContentRef} />
    </>
  );
}
