import { useQuery } from "@tanstack/react-query";
import { getTotalUnreadMessages } from "../api/message.service";

export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: ["messages", "unread-count"],
    queryFn: getTotalUnreadMessages,
  });
};
