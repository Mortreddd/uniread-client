import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Follow } from "@/types/Follow";
import { PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetUserFollowers(
  userId: string | undefined,
  { pageNo, pageSize, query }: PaginateParams
) {
  const [state, setState] = useState<RequestState<Follow[]>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, error: null, loading: true });
    async function getUserFollowers() {
      api
        .get(`/follow/${userId}/followers`, {
          params: { pageNo, pageSize, query },
        })
        .then((response: AxiosResponse<Follow[]>) => {
          setState({ data: response.data, error: null, loading: false });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            error: error.response?.data.message ?? null,
            loading: false,
          });
        });
    }

    getUserFollowers();
  }, [pageNo, pageSize, query]);

  return state;
}
