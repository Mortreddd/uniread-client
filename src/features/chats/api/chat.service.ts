import api from "@/core/api/ApiService";
import {
  ChatConversationPreview,
  Conversation,
  ConversationDetail,
  Message,
} from "../types/Chat";
import { Paginate, PaginateParams } from "@/types/Pagination";

export const getConversations: (
  params: PaginateParams,
) => Promise<Paginate<ChatConversationPreview[]>> = async (
  params: PaginateParams,
) => {
  const res = await api.get<Paginate<ChatConversationPreview[]>>(
    "/conversations",
    {
      params,
    },
  );

  return res.data;
};

export const getDirectConversation: (
  receiverId: string,
) => Promise<Conversation> = async (receiverId) => {
  const res = await api.get<Conversation>("/conversations/direct", {
    params: { receiverId },
  });

  return res.data;
};

export const getConversation: (
  conversationId?: string,
) => Promise<ConversationDetail> = async (conversationId?: string) => {
  const res = await api.get<ConversationDetail>(
    `/conversations/${conversationId}`,
  );
  return res.data;
};

interface GetConversationMessageProps extends PaginateParams {
  conversationId?: string;
}
export const getConversationMessages: (
  params: GetConversationMessageProps,
) => Promise<Paginate<Message[]>> = async ({
  conversationId,
  ...params
}: GetConversationMessageProps) => {
  const response = await api.get<Paginate<Message[]>>(
    `/conversations/${conversationId}/messages`,
    {
      params,
    },
  );

  return response.data;
};
