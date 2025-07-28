import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {AuthorDetail} from "@/types/User.ts";

interface GetUserFollowersProps extends PaginateParams {
  userId: string | undefined;
}
export default function useGetUserFollowers({
  userId,
  pageNo,
  pageSize,
  query,
}: GetUserFollowersProps) {
  const [state, setState] = useState<RequestState<Paginate<AuthorDetail[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    setState({ data: null, error: null, loading: true });
    async function getUserFollowers() {
      api
        .get(`/users/${userId}/follow/followers`, {
          params: { pageNo, pageSize, query },
        })
        .then((response: AxiosResponse<Paginate<AuthorDetail[]>>) => {
          setState({ data: response.data, error: null, loading: false });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            error: error.response?.data.message ?? "Unable to get followers",
            loading: false,
          });
        });
    }

    getUserFollowers();
  }, [pageNo, pageSize, query]);

  return state;
}
