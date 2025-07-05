import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { RequestState } from "@/types/Pagination";
import { Paragraph } from "@/types/Paragraph";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface GetBookChapterParagraphsProps {
  bookId: string;
  chapterId: string;
}

export default function useGetBookChapterParagraphs({
  bookId,
  chapterId,
}: GetBookChapterParagraphsProps) {
  const [state, setState] = useState<RequestState<Paragraph[]>>({
    data: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getBookChapterParagraphs() {
      setState({ ...state, loading: true });

      await api
        .get(`/books/${bookId}/chapters/${chapterId}/paragraphs`, { signal })
        .then((response: AxiosResponse<Paragraph[]>) => {
          setState({ data: response.data, error: null, loading: false });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            error: error.response?.data?.message ?? "Something went wrong",
            loading: false,
          });
        });
    }

    getBookChapterParagraphs();
  }, [bookId, chapterId]);

  return state;
}
