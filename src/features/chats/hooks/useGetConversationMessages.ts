import { PaginateParams } from "@/types/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getConversationMessages } from "../api/chat.service";

interface GetConversationMessagesProps extends PaginateParams {
  conversationId?: string;
}
export const useGetConversationMessages = (
  params: GetConversationMessagesProps,
) => {
  return useQuery({
    queryKey: [
      "conversationMessages",
      params.conversationId,
      params.pageNo,
      params.pageSize,
    ],
    queryFn: () => getConversationMessages(params),
    enabled: !!params.conversationId,
  });
};
