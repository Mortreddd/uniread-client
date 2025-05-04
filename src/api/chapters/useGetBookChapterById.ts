import { Chapter } from "@/types/Chapter.ts";
import { useEffect, useState } from "react";
import { RequestState } from "@/types/Pagination.ts";
import api from "@/services/ApiService.ts";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Error.ts";

interface GetBookChapterById {
  bookId?: string;
  chapterId?: string;
}

/**
 * Get the book chapter data by ID.
 * @param param0 - An object containing bookId and chapterId.
 * @returns The state containing chapter data, loading status, and error information.
 */

export default function useGetBookChapterById({
  bookId,
  chapterId,
}: GetBookChapterById) {
  const [state, setState] = useState<RequestState<Chapter>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getBookChapterById() {
      setState({ ...state, loading: true });
      await api
        .get(`/books/${bookId}/chapters/${chapterId}`, {
          signal,
        })
        .then((response: AxiosResponse<Chapter>) => {
          setState({ loading: false, data: response.data, error: null });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            data: null,
            error: error?.response?.data.message ?? "Unable to get the chapter",
          });
        });
    }

    getBookChapterById();
  }, [bookId, chapterId]);

  return state;
}
