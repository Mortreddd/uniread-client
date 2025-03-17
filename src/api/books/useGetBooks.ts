import api from "@/services/ApiService";
import { Book } from "@/types/Book";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useGetBooks({ pageNo, pageSize, query }: PaginateParams) {
  const [state, setState] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      api
        .get("/books", {
          params: {
            pageNo,
            pageSize,
            query,
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
        });
    };

    fetchBooks();
  }, [pageNo, pageSize, query]);

  return state;
}
