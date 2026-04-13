import api from "@/core/api/ApiService.ts";
import { BookDetail, BookParams } from "@/features/books/types/Book.ts";
import { Paginate, RequestState } from "@/types/Pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetBooks(params: BookParams) {
  const [state, setState] = useState<RequestState<Paginate<BookDetail[]>>>({
    data: null,
    error: null,
    loading: true,
  });

  const genresKey = JSON.stringify(params.genres);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const response: AxiosResponse<Paginate<BookDetail[]>> = await api.get(
          "/books",
          {
            params: params,
            signal: controller.signal,
            paramsSerializer: {
              indexes: null,
            },
          },
        );

        setState({ data: response.data, error: null, loading: false });
      } catch (error) {
        if (axios.isCancel(error)) return;

        setState({
          data: null,
          error: (error as AxiosError).message,
          loading: false,
        });
      }
    };

    const isSearching = params.query && params.query.trim().length > 0;
    const handler = setTimeout(fetchBooks, isSearching ? 300 : 0);
    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [
    params.pageNo,
    params.pageSize,
    params.query,
    params.status,
    genresKey, // Use the stringified version!
    params.sortBy,
    params.orderBy,
    params.startDate,
    params.endDate,
    params.deletedAt,
  ]);

  return state;
}
