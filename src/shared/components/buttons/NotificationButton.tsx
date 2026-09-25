import { BellIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button";
import { useNotificationStream } from "@/contexts/NotificationStreamContext";
import withBadge from "../withBadge";
import { useMarkReadNotification } from "@/shared/hooks/useNotification";

const WithBadge = withBadge(Button);
export default function NotificationButton() {
  const { notificationCount, resetCountNotification } = useNotificationStream();

  const markReadMutation = useMarkReadNotification();

  async function handleClickNotification() {
    markReadMutation.mutateAsync();
    resetCountNotification();
  }

  return (
    <WithBadge
      onClick={handleClickNotification}
      badgeContent={notificationCount}
      variant="transparent"
      className="rounded-full border border-gray-300 dark:border-gray-600 p-1 md:p-2 shadow-lg hover:shadow-xl transition-shadow"
    >
      <BellIcon className="size-4 md:size-5" />
    </WithBadge>
  );
}
