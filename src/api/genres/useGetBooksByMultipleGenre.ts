import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import api from "@/services/ApiService.ts";
import { Paginate, RequestState } from "@/types/Pagination.ts";
import { Book } from "@/types/Book.ts";
import { ErrorResponse } from "@/types/Error.ts";

export function useGetBooksByMultipleGenre(
  genreIds: number[],
  pageNo: number = 0,
  pageSize: number = 10
) {
  const [state, setState] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    loading: false,
    error: null,
  });
  useEffect(() => {
    const controller = new AbortController();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getBooksByMultipleGenre() {
      setState({ ...state, loading: true });
      api
        .get(`/genres/options`, {
          params: {
            genres: genreIds,
            pageNo,
            pageSize,
          },
          cancelToken: source.token,
          signal: controller.signal,
        })
        .then((response: AxiosResponse<Paginate<Book[]>>) => {
          setState({ error: null, data: response.data, loading: false });
          console.log(response);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          if (axios.isCancel(error)) return;
          setState({
            error: "Unable to get books",
            data: null,
            loading: false,
          });
        });
    }

    getBooksByMultipleGenre();

    return () => {
      source.cancel("Canceled Request");
      controller.abort("Canceled Request");
    };
  }, [genreIds, pageNo, pageSize]);

  return state;
}
