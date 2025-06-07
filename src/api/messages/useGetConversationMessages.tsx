import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Message } from "@/types/Message";
import {Paginate, PaginateParams, RequestState} from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface GetConversationMessagesProps extends PaginateParams {
  userId?: string;
  conversationId?: string;
}

export default function useGetConversationMessages({
  userId,
  conversationId,
  pageNo,
  pageSize,
}: GetConversationMessagesProps) {
  const [state, setState] = useState<RequestState<Paginate<Message[]>>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getConversationMessages() {
      setState({ loading: true, error: null, data: null });
      api
        .get(`/users/${userId}/conversations/${conversationId}/messages`, {
          params: {
            pageNo,
            pageSize,
          },
          signal,
        })
        .then((response: AxiosResponse<Paginate<Message[]>>) => {
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
  }, [conversationId, pageNo, pageSize]);

  return state;
}
