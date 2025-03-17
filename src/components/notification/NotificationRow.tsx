import Icon from "@/components/Icon";
import { Notification } from "@/types/Notification";
import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";

type NotificationType = "info" | "warning" | "error" | "success";

interface NotificationRowProps extends HTMLAttributes<HTMLDivElement> {
  notification?: Notification;
  notificationType?: NotificationType;
}

export default function NotificationRow({
  className,
  children,
  notification,
  notificationType,
  ...rest
}: NotificationRowProps) {
  return (
    <div
      className={cn(
        "bg-white transition-colors md:p-5 p-3 duration-200 ease-in-out cursor-pointer flex w-full items-center justify-between",
        className
      )}
      {...rest}
    >
      <Icon />
      <div className="flex flex-col ml-4 min-w-48 flex-wrap">
        <strong className="text-lg font-bold text-black ">
          {notification?.title ?? "Boss_Emman"}
        </strong>
        <p className="text-sm text-gray-500">
          {notification?.description ?? "Follows you"}
        </p>
        {children}
        <p className="text-xs text-gray-300">August 08, 2023</p>
      </div>
    </div>
  );
}
