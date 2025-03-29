import api from "@/services/ApiService";
import { Book } from "@/types/Book";
import { ErrorResponse } from "@/types/Error";
import { RequestState, Paginate } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

/**
 * * This effect is used to fetch books by multiple genres when the component mounts or when the genres change.
 * * It uses the AbortController to cancel the request if the component unmounts before the request is completed.
 */
export default function useGetBooksByGenreIds(
  genreIds: number[],
  pageNo?: number,
  pageSize?: number
) {
  const [result, setResult] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function getBooksByMultipleGenre() {
      setResult((prev) => ({ ...prev, loading: true }));

      api
        .get(`/genres/options`, {
          params: {
            pageNo: pageNo,
            pageSize: pageSize,
            genres: genreIds,
          },
          signal: controller.signal,
          paramsSerializer: (params) => {
            return Object.keys(params)
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
          setResult({ error: null, data: response.data, loading: false });
          console.log(response);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setResult({
            error: error?.response?.data.message ?? "Unable to get books",
            data: null,
            loading: false,
          });
        });
    }

    getBooksByMultipleGenre();

    return () => {
      controller.abort("Canceled Request");
    };
  }, [genreIds, pageSize, pageNo]);

  return result;
}
