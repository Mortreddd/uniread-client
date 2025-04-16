import { useEffect, useState } from "react";
import {Paginate, RequestState} from "@/types/Pagination.ts";
import {Book, BookParams} from "@/types/Book.ts";
import api from "@/services/ApiService.ts";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Error.ts";

interface GetUserBooksProps extends BookParams {
  userId: undefined | string,
}

export default function useGetUserBooks({ userId, pageNo, pageSize, query, status} : GetUserBooksProps) {
  const [state, setState] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function getUserBooks() {
      setState({ ...state, loading: true });
      api
        .get(`/authors/${userId}/books`, {
          params: {
            pageNo,
            pageSize,
            query,
            status
          },
          signal: controller.signal,
        })
        .then((response: AxiosResponse<Paginate<Book[]>>) => {
          console.log(response);
          setState({ loading: false, data: response.data, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            data: null,
            error: error?.response?.data.message ?? "Unable to load books",
          });
        });
    }
    getUserBooks();

    return () => {
      controller.abort("Cancelled");
    };
  }, [pageNo, pageSize, query, userId, status]);

  return state;
}
