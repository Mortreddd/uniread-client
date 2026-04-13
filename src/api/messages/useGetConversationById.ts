import { useEffect, useState } from "react";
import { RequestState } from "@/types/Pagination.ts";
import api from "@/core/api/ApiService.ts";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ConversationDetail } from "@/features/chats/types/Chat.ts";
import { ErrorResponse } from "@/types/Error.ts";

interface GetConversationByIdProps {
  conversationId: string | undefined;
}

export default function useGetConversationById({
  conversationId,
}: GetConversationByIdProps) {
  const [state, setState] = useState<RequestState<ConversationDetail>>({
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

    async function getConversationById() {
      setState({ data: null, error: null, loading: true });

      try {
        const response: AxiosResponse<ConversationDetail> = await api.get(
          `/conversations/${conversationId}`,
          { signal: controller.signal },
        );
        setState({ data: response.data, error: null, loading: false });
      } catch (error) {
        if (axios.isCancel(error)) return;

        const axiosError = error as AxiosError<ErrorResponse>;
        setState({
          data: null,
          error:
            axiosError.response?.data.message ??
            "Unable to get the conversation",
          loading: false,
        });
      }
    }

    getConversationById();

    return () => controller.abort();
  }, [conversationId]);

  return state;
}
