import { Follow } from "@/types/Follow.ts";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination.ts";
import { useEffect, useState } from "react";
import api from "@/services/ApiService.ts";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Error.ts";

interface GetUserFollows extends PaginateParams {
  userId: string | undefined;
}

export default function useGetUserFollows({
  userId,
  pageNo,
  pageSize,
  query,
}: GetUserFollows) {
  const [state, setState] = useState<RequestState<Paginate<Follow[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    async function getUserFollows() {
      setState({ ...state, loading: true });
      await api
        .get(`/users/${userId}/follow/follows`, {
          signal: controller.signal,
        })
        .then((response: AxiosResponse<Paginate<Follow[]>>) => {
          console.log(response.data);
          setState({ loading: false, data: response.data, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            data: null,
            error: error.response?.data.message ?? "Unable to get followers",
          });
        });
    }

    getUserFollows();
  }, [userId, pageNo, pageSize, query]);

  return state;
}
