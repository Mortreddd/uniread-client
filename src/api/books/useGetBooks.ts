import api from "@/services/ApiService";
import { Book, BookParams } from "@/types/Book";
import { BookStatus } from "@/types/Enums";
import { Paginate, RequestState } from "@/types/Pagination";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetBooks({
  pageNo,
  pageSize,
  query,
  genres = [],
  status = BookStatus.PUBLISHED,
  sortBy = "asc",
  orderBy = "createdAt",
  startDate = "",
  endDate = "",
  deletedAt = "",
}: BookParams) {
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
            genres,
            status: status !== undefined ? status : undefined,
            sortBy,
            orderBy,
            startDate,
            endDate,
            deletedAt,
          },
          signal: controller.signal,
          cancelToken: source.token,
          paramsSerializer: (params) => {
            return Object.keys(params)
              .filter((key) => params[key] !== undefined && params[key] !== "")
              .map((key) =>
                Array.isArray(params[key])
                  ? params[key]
                      .map(
                        (val) =>
                          `${encodeURIComponent(key)}=${encodeURIComponent(
                            val
                          )}`
                      )
                      .join("&")
                  : `${encodeURIComponent(key)}=${encodeURIComponent(
                      params[key]
                    )}`
              )
              .join("&");
          },
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
  }, [
    pageNo,
    pageSize,
    query,
    status,
    genres,
    sortBy,
    orderBy,
    startDate,
    endDate,
    deletedAt,
  ]);

  return state;
}
