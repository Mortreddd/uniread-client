import api from "@/core/api/ApiService.ts";
import { ErrorResponse } from "@/types/Error";
import { ConversationMessage } from "@/features/chats/types/Chat.ts";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface ConversationMessagesParams extends PaginateParams {
  conversationId?: string;
}

export default function useGetConversationMessages({
  conversationId,
  pageNo,
  pageSize,
}: ConversationMessagesParams) {
  const [state, setState] = useState<
    RequestState<Paginate<ConversationMessage[]>>
  >({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!conversationId) {
      setState({ data: null, error: null, loading: false });
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    async function getConversationMessages() {
      setState({ loading: true, error: null, data: null });
      api
        .get(`/conversations/${conversationId}/messages`, {
          params: {
            pageNo,
            pageSize,
          },
          signal,
        })
        .then((response: AxiosResponse<Paginate<ConversationMessage[]>>) => {
          setState({ loading: false, error: null, data: response.data });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            error: error.response?.data.message || "An error occurred",
            data: null,
          });
        });
    }

    getConversationMessages();

    return () => controller.abort();
  }, [conversationId, pageNo, pageSize]);

  return state;
}
