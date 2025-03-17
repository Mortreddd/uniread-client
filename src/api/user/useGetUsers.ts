import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import api from "@/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";

export default function useGetUsers({
  pageNo,
  pageSize,
  query,
}: PaginateParams) {
  const [state, setState] = useState<RequestState<Paginate<User[]>>>({
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
      .then((response: AxiosResponse<Paginate<User[]>>) => {
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
