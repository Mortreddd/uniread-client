import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { ConversationDetail } from "@/types/Message";
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
  const [state, setState] = useState<
    RequestState<Paginate<ConversationDetail[]>>
  >({
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
      .then((response: AxiosResponse<Paginate<ConversationDetail[]>>) => {
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
