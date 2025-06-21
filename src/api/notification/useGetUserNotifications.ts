import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Notification } from "@/types/Notification";

interface GetUserNotificationsProps extends PaginateParams {}
export default function useGetUserNotifications({
  pageNo,
  pageSize,
  query,
  sortBy,
  orderBy,
  startDate,
  endDate,
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
        .get(`/notifications`, {
          params: {
            pageNo,
            pageSize,
            query,
            sortBy,
            orderBy,
            startDate,
            endDate,
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
  }, [pageNo, pageSize, query, sortBy, orderBy, startDate, endDate]);

  return state;
}
