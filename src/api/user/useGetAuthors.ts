import { useEffect, useState } from "react";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";

interface GetUsersProps extends PaginateParams {
  bannedAt?: string
  deletedAt?: string
}

export default function useGetAuthors<T>({
  pageNo,
  pageSize,
  query,
    sortBy,
    orderBy,
    startDate,
    endDate,
    bannedAt,
    deletedAt
}: GetUsersProps) {
  const [state, setState] = useState<RequestState<Paginate<T[]>>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    setState({ loading: true, error: null, data: null });
    api
      .get("/authors", {
        params: {
          pageNo,
          pageSize,
          query,
          sortBy,
          orderBy,
          startDate,
          endDate,
          bannedAt,
          deletedAt
        },
      })
      .then((response: AxiosResponse<Paginate<T[]>>) => {
        setState({ loading: false, error: null, data: response.data });
      })
      .catch((error: AxiosError) => {
        setState({
          data: null,
          error: error.message,
          loading: false,
        });
      });
  }, [pageNo, pageSize, query, sortBy, orderBy, startDate, endDate, bannedAt, deletedAt]);

  return state;
}
