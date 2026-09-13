import { Formatters } from "@/utils/formatters";
import { Message } from "../types/Chat";

export default function TimeIndicator({ message }: { message: Message }) {
  return (
    <div className="flex items-center w-full my-2">
      <div className="border-t border-gray-300 dark:border-gray-600 flex-1" />

      <time
        dateTime={message.createdAt}
        className="w-fit px-3 lg:px-5 text-extratiny lg:text-tiny text-gray-500 dark:text-gray-400"
      >
        {Formatters.Date.formatShortDateWithTime(new Date(message.createdAt))}
      </time>

      <div className="border-t border-gray-300 dark:border-gray-600 flex-1" />
    </div>
  );
}
