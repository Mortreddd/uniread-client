import api from "@/services/ApiService";
import { BookComment } from "@/types/Book";
import { ErrorResponse } from "@/types/Error";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

/**
 * Custom hook to get comments for a book
 * @param {string} bookId - The ID of the book to get the comments of the selected book
 */

interface GetBookCommentsProps extends PaginateParams {
  bookId: string | undefined;
}

export default function useGetBookComments({
  bookId,
  pageNo,
  pageSize,
  sortBy,
  orderBy,
}: GetBookCommentsProps) {
  const [state, setState] = useState<RequestState<Paginate<BookComment[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getBookComments() {
      setState({ ...state, loading: true });
      await api
        .get(`/books/${bookId}/comments`, {
          params: {
            pageNo,
            pageSize,
            sortBy,
            orderBy,
          },
          signal,
        })
        .then((response: AxiosResponse<Paginate<BookComment[]>>) => {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            loading: false,
            error: error.response?.data?.message || "An error occurred",
          });
        });
    }

    getBookComments();
  }, [bookId, pageNo, pageSize, sortBy, orderBy]);

  return state;
}
