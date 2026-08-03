import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../api/chat.service";

interface GetConversationProps {
  conversationId?: string;
}
export const useGetConversation = ({
  conversationId,
}: GetConversationProps) => {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversation(conversationId),
    enabled: !!conversationId,
  });
};
