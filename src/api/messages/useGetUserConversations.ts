import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Conversation } from "@/types/Message";
import { Paginate, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export interface GetUserConversationsProps {
  pageNo?: number;
  pageSize?: number;
  userId: string | null | undefined;
  name?: string;
}
export default function useGetUserConversations({
  userId,
  pageNo = 0,
  pageSize = 10,
  name,
}: GetUserConversationsProps) {
  const [state, setState] = useState<RequestState<Paginate<Conversation[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    api
      .get(`/users/${userId}/conversations`, {
        params: { pageNo, pageSize, name },
      })
      .then((response: AxiosResponse<Paginate<Conversation[]>>) => {
        setState({ data: response.data, error: null, loading: false });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setState({
          data: null,
          error: error.response?.data.message ?? "Unable to load conversations",
          loading: false,
        });
      });
  }, [pageNo, pageSize, userId]);

  return state;
}
