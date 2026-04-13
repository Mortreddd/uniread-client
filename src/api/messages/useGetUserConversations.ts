import api from "@/core/api/ApiService.ts";
import { ErrorResponse } from "@/types/Error";
import ChatPreview from "@/features/chats/types/Chat.ts";
import { Paginate, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";

export interface GetUserConversationsProps {
  pageNo?: number;
  pageSize?: number;
  isArchived?: boolean;
}

export default function useGetUserConversations({
  pageNo = 0,
  pageSize = 10,
  isArchived = false,
}: GetUserConversationsProps) {
  const [state, setState] = useState<RequestState<Paginate<ChatPreview[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  const params = useMemo(() => {
    return { pageNo, pageSize, isArchived };
  }, [pageNo, pageSize, isArchived]);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    setState({ ...state, loading: true });
    api
      .get(`/conversations`, {
        params,
      })
      .then((response: AxiosResponse<Paginate<ChatPreview[]>>) => {
        console.log(response);
        setState({ data: response.data, error: null, loading: false });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setState({
          data: null,
          error: error.response?.data.message ?? "Unable to load conversations",
          loading: false,
        });
      });
  }, [paramsKey]);
  return state;
}
