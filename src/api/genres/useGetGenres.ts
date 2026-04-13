import api from "@/core/api/ApiService.ts";
import { Genre } from "@/features/books/types/Book.ts";
import { RequestState } from "@/types/Pagination";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetGenres() {
  const [state, setState] = useState<RequestState<Genre[]>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    api
      .get("/genres", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result: AxiosResponse<Genre[]>) => {
        setState({ ...state, data: result.data, loading: false, error: null });
      })
      .catch((error: AxiosResponse<string>) => {
        setState({ ...state, data: null, loading: false, error: error.data });
      });
  }, []);

  return state;
}
