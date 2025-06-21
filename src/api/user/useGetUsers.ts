import { useEffect, useState } from "react";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";

export default function useGetUsers<T>({
  pageNo,
  pageSize,
  query,
}: PaginateParams) {
  const [state, setState] = useState<RequestState<Paginate<T[]>>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    setState({ loading: true, error: null, data: null });
    api
      .get("/users", {
        params: {
          pageNo,
          pageSize,
          query,
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
  }, [pageNo, pageSize, query]);

  return state;
}
