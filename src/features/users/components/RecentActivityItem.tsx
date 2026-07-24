import { Button } from "@/shared/components/form/Button";
import {
  Notification,
  NotificationType,
} from "@/shared/components/types/Notification";
import { Formatters } from "@/utils/formatters";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface RecentActivityItemProps {
  notification: Notification;
}

export default function RecentActivityItem({
  notification,
}: RecentActivityItemProps) {
  const type = notification.type;
  switch (type) {
    case NotificationType.BOOK_LIKED:
      return <BookLikedActivity notification={notification} />;
    case NotificationType.COMMENT_ADDED:
      return <BookCommentedActivity notification={notification} />;
    case NotificationType.FOLLOW:
      return <UserFollowedActivity notification={notification} />;
    default:
      return <DefaultActivity notification={notification} />;
  }
}

function BookLikedActivity({ notification }: RecentActivityItemProps) {
  return (
    <div
      className={`p-2 md:p-3 relative flex rounded max-h-28 ${notification.isRead ? "bg-transparent" : "dark:bg-slate-800 bg-gray-200"}`}
    >
      <div className="shrink-0 size-5 md:size-6">
        <HeartIcon
          fill={"currentColor"}
          className={"text-primary dark:text-primary-dark"}
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1 ml-2 items-baseline">
        <h6 className="text-gray-800 dark:text-gray-200 text-tiny md:text-xs lg:text-sm">
          <span className="font-bold">{notification.actorName}</span> liked your
          story <span className="font-bold">{notification.entityName}</span>
        </h6>
        <p className="leading-tight text-gray-600 dark:text-gray-300 text-extratiny md:text-tiny lg:text-xs">
          {Formatters.Date.formatRelativeDateTime(
            new Date(notification.createdAt),
          )}
        </p>
      </div>
    </div>
  );
}

function BookCommentedActivity({ notification }: RecentActivityItemProps) {
  return (
    <div
      className={`p-2 md:p-3 relative flex rounded max-h-28 ${notification.isRead ? "bg-transparent" : "dark:bg-slate-800 bg-gray-200"}`}
    >
      <div className="shrink-0 size-5 md:size-6">
        <ChatBubbleLeftIcon
          fill={"currentColor"}
          className={"text-primary dark:text-primary-dark"}
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1 ml-2">
        <h6 className="text-gray-800 dark:text-gray-200 text-tiny md:text-xs lg:text-sm">
          <span className="font-bold">{notification.actorName}</span> commented
          on <span className="font-bold">{notification.entityName}</span>
        </h6>
        {/* <p className="text-gray-800 dark:text-gray-200 font-thin text-extratiny md:text-tiny lg:text-xs truncate line-clamp-2 md:line-clamp-3">
          "{notification.message}"
        </p> */}
        <p className="leading-tight text-gray-600 dark:text-gray-300 text-extratiny md:text-tiny lg:text-xs">
          {Formatters.Date.formatRelativeDateTime(
            new Date(notification.createdAt),
          )}
        </p>
      </div>
    </div>
  );
}

/**
 * Notification Item for NotificationType.FOLLOW
 * @param notification
 * @returns
 */
function UserFollowedActivity({ notification }: RecentActivityItemProps) {
  return (
    <div
      className={`p-2 md:p-3 relative flex rounded max-h-28 ${notification.isRead ? "bg-transparent" : "dark:bg-slate-800 bg-gray-200"}`}
    >
      <div className="shrink-0 size-5 md:size-6">
        <UserPlusIcon
          fill={"currentColor"}
          className={"text-primary dark:text-primary-dark"}
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1 ml-2">
        <h6 className="text-gray-800 dark:text-gray-200 text-tiny md:text-xs lg:text-sm">
          <span className="font-bold">{notification.actorName}</span> requested
          to follow you
        </h6>
        <div className="inline-flex items-center gap-1.5">
          <Button
            size={"sm"}
            className={"text-extratiny md:text-tiny lg:text-xs rounded"}
          >
            <span className="text-white">Accept</span>
          </Button>
          <Button
            variant={"dark"}
            className={"text-extratiny md:text-tiny lg:text-xs rounded"}
          >
            <span className="text-white">Reject</span>
          </Button>
        </div>
        <p className="leading-tight text-gray-600 dark:text-gray-300 text-extratiny md:text-tiny lg:text-xs">
          {Formatters.Date.formatRelativeDateTime(
            new Date(notification.createdAt),
          )}
        </p>
      </div>
    </div>
  );
}

function DefaultActivity({ notification }: RecentActivityItemProps) {
  return (
    <div
      className={`p-2 md:p-3 relative flex rounded max-h-28 ${notification.isRead ? "bg-transparent" : "dark:bg-slate-800 bg-gray-200"}`}
    >
      <div className="shrink-0 size-5 md:size-6">
        <ChatBubbleLeftIcon
          fill={"currentColor"}
          className={"text-primary dark:text-primary-dark"}
        />
      </div>
      <div className="flex-1 min-w-0 space-y-1 ml-2">
        <h6 className="text-gray-800 dark:text-gray-200 text-tiny md:text-xs lg:text-sm">
          <span className="font-bold">{notification.actorName}</span> commented
          on <span className="font-bold">{notification.entityName}</span>
        </h6>
        <p className="leading-tight text-gray-600 dark:text-gray-300 text-extratiny md:text-tiny lg:text-xs">
          {Formatters.Date.formatRelativeDateTime(
            new Date(notification.createdAt),
          )}
        </p>
      </div>
    </div>
  );
}
