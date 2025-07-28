import api from "@/services/ApiService";
import { Chapter, ChapterParams } from "@/types/Chapter";
import { ErrorResponse } from "@/types/Error";
import { Paginate, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetBookChapters({
  bookId,
  pageNo,
  pageSize,
  query,
  status,
  startDate,
  endDate,
}: ChapterParams) {
  const [state, setState] = useState<RequestState<Paginate<Chapter[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getBookChapters() {
      setState({ ...state, loading: true });
      await api
        .get(`/books/${bookId}/chapters`, {
          params: {
            pageNo,
            pageSize,
            status,
            startDate,
            endDate,
            query,
          },
          signal: signal,
        })
        .then((response: AxiosResponse<Paginate<Chapter[]>>) => {
          console.log(response.data);
          setState({
            ...state,
            data: response.data,
            loading: false,
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            ...state,
            loading: false,
            error: error.response?.data.message || "Something went wrong",
          });
        });
    }

    getBookChapters();
  }, [bookId, pageSize, pageNo, status, startDate, endDate, query]);

  return state;
}
