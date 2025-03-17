import api from "@/services/ApiService";
import { Genre } from "@/types/Book";
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
