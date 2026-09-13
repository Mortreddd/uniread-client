import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button } from "../form/Button";
import withBadge from "../withBadge";
import { useRealtime } from "@/contexts/RealtimeContext";
const WithBadge = withBadge(Button);
export default function MessageInboxButton() {
  const { unreadMessagesCount } = useRealtime();
  const displayCount = unreadMessagesCount > 99 ? "+99" : unreadMessagesCount;
  return (
    <WithBadge
      variant={"transparent"}
      className={
        "rounded-full border border-gray-300 dark:border-gray-600 p-1 md:p-2 shadow-lg hover:shadow-xl transition-shadow"
      }
      badgeContent={displayCount}
    >
      <Link to="/chats">
        <EnvelopeIcon className="size-4 md:size-5" />
      </Link>
    </WithBadge>
  );
}
