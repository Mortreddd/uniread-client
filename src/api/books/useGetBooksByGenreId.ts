import api from "@/core/api/ApiService.ts";
import {BookDetail, BookParams} from "@/features/books/types/Book.ts";
import { ErrorResponse } from "@/types/Error";
import { Paginate, RequestState } from "@/types/Pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface GetBooksByGenreProps extends BookParams {
  genreId: number;
}
export default function useGetBooksByGenreId({
  genreId,
  pageNo,
  pageSize,
  query,
  status
}: GetBooksByGenreProps) {
  const [state, setState] = useState<RequestState<Paginate<BookDetail[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getBooksByGenreId() {
      setState({ ...state, loading: true });
      api
        .get(`/genres/${genreId}/books`, {
          params: {
            pageNo,
            pageSize,
            query,
            status
          },
          cancelToken: source.token,
        })
        .then((response: AxiosResponse<Paginate<BookDetail[]>>) => {
          setState({ error: null, data: response.data, loading: false });
          console.log(response);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            error: error?.response?.data.message ?? "Unable to get the books",
            data: null,
            loading: false,
          });
        });
    }

    getBooksByGenreId();

    return () => source.cancel("Cancelled Request");
  }, [genreId, pageNo, pageSize, query, status]);

  return state;
}
