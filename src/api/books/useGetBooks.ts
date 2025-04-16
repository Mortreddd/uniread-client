import api from "@/services/ApiService";
import {Book, BookParams} from "@/types/Book";
import { Paginate, RequestState } from "@/types/Pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetBooks({ pageNo, pageSize, query, status }: BookParams) {
  const [state, setState] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const fetchBooks = async () => {
      setState({ ...state, loading: true });
      api
        .get("/books", {
          params: {
            pageNo,
            pageSize,
            query,
            status
          },
          signal: controller.signal,
          cancelToken: source.token,
        })
        .then((response: AxiosResponse<Paginate<Book[]>>) => {
          setState({
            data: response.data,
            error: null,
            loading: false,
          });
          console.log(response.data.content);
        })
        .catch((error: AxiosError) => {
          setState({
            data: null,
            error: error.message,
            loading: false,
          });
          console.log(error);
        });
    };

    fetchBooks();
    return () => {
      controller.abort();
      source.cancel("Request cancelled");
    };
  }, [pageNo, pageSize, query, status]);

  return state;
}
