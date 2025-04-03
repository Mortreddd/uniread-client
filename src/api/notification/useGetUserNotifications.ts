import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Notification } from "@/types/Notification";

interface GetUserNotificationsProps extends PaginateParams {
  userId: string | undefined;
}
export default function useGetUserNotifications({
  userId,
  pageNo,
  pageSize,
  query,
}: GetUserNotificationsProps) {
  const [state, setState] = useState<RequestState<Paginate<Notification[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    async function getUserNotifications() {
      setState({ ...state, loading: true });
      await api
        .get(`/users/${userId}/notifications`, {
          params: {
            pageNo,
            pageSize,
            query,
          },
          signal: controller.signal,
        })
        .then((response: AxiosResponse<Paginate<Notification[]>>) => {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            error:
              error.response?.data.message ?? "An unexpected error occurred",
            loading: false,
          });
        });
    }

    getUserNotifications();
  }, [userId, pageNo, pageSize, query]);

  return state;
}
