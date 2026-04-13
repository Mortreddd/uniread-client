import api from "@/core/api/ApiService.ts";
import { ErrorResponse } from "@/types/Error";
import ChatPreview from "@/features/chats/types/Chat.ts";
import { Paginate, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export interface GetUserConversationsProps {
  pageNo?: number;
  pageSize?: number;
  isGroup?: boolean;
  isArchived?: boolean;
}
export default function useGetUserRecentConversations({
  pageNo = 0,
  pageSize = 10,
  isGroup = false,
  isArchived = false,
}: GetUserConversationsProps) {
  const [state, setState] = useState<RequestState<Paginate<ChatPreview[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    api
      .get(`/conversations`, {
        params: { pageNo, pageSize, isGroup, isArchived },
      })
      .then((response: AxiosResponse<Paginate<ChatPreview[]>>) => {
        setState({ data: response.data, error: null, loading: false });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setState({
          data: null,
          error: error.response?.data.message ?? "Unable to load conversations",
          loading: false,
        });
      });
  }, [pageNo, pageSize]);

  return state;
}
