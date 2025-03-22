import api from "@/services/ApiService";
import { Book } from "@/types/Book";
import { ErrorResponse } from "@/types/Error";
import { RequestState } from "@/types/Pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetBookById(id?: string) {
  const [state, setState] = useState<RequestState<Book>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    async function getBookById() {
      setState({ ...state, loading: true });

      api
        .get(`/books/${id}`, {
          cancelToken: source.token,
        })
        .then((response: AxiosResponse<Book>) => {
          setState({
            data: response.data,
            error: null,
            loading: false,
          });
          console.log(response.data);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            error: error.message,
            loading: false,
          });
        });
    }

    getBookById();

    return () => {
      source.cancel("Cancelled request");
    };
  }, [id]);

  return state;
}
