import { useAuth } from "@/contexts/AuthContext";
import { Message } from "../types/Chat";
import { cn } from "@/utils/ClassNames";

export default function ConvoMessage({ message }: { message: Message }) {
  const { user } = useAuth();

  const isSender = message.senderId === user?.id;

  return (
    <div
      className={cn("w-full flex", isSender ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] w-fit px-3 py-2 text-sm md:text-base",
          "rounded-lg",
          isSender
            ? "bg-primary dark:bg-primary-dark text-white rounded-br-none"
            : "bg-gray-300 dark:bg-slate-700 text-gray-900 dark:text-gray-200 rounded-bl-none",
        )}
      >
        <p>{message.message}</p>
      </div>
    </div>
  );
}
