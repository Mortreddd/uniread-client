import api from "@/services/ApiService";
import { Book } from "@/types/Book";
import { ErrorResponse } from "@/types/Error";
import { Paginate, RequestState } from "@/types/Pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetBooksByGenreId(
  genreId: number,
  pageNo: number = 0,
  pageSize: number = 10
) {
  const [state, setState] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function useGetBooksByGenreId() {
      setState({ ...state, loading: true });
      api
        .get(`/genres/${genreId}/books`, {
          cancelToken: source.token,
        })
        .then((response: AxiosResponse<Paginate<Book[]>>) => {
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

    useGetBooksByGenreId();

    return () => source.cancel("Cancelled Request");
  }, [genreId, pageNo, pageSize]);

  return state;
}
