import { Link, useSearchParams } from "react-router-dom";
import LoadingCircle from "../LoadingCirlce";
import withHover from "../withHover";
import BookInfo from "./BookInfo";
import api from "@/services/ApiService";
import { Book } from "@/types/Book";
import { RequestState, Paginate, PaginateParams } from "@/types/Pagination";
import { AxiosResponse, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { ErrorResponse } from "@/types/Error";

export default function BookSection() {
  // @ts-ignore
  const [params, setParams] = useSearchParams();
  const genreIds: number[] = params.getAll("genres").map(Number);
  const BookInfoWithHover = withHover(BookInfo);
  // @ts-ignore
  const [state, setState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const [result, setResult] = useState<RequestState<Paginate<Book[]>>>({
    data: null,
    loading: false,
    error: null,
  });

  const { data: books, loading } = result;

  useEffect(() => {
    const controller = new AbortController();

    async function getBooksByMultipleGenre() {
      setResult((prev) => ({ ...prev, loading: true }));

      api
        .get(`/genres/options`, {
          params: {
            pageNo: state.pageNo,
            pageSize: state.pageSize,
            genres: genreIds,
          },
          signal: controller.signal,
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
  }, []);

  return (
    <section className="w-full h-fit px-10 py-5 grid grid-cols-2 grid-flow-row gap-5">
      {loading && (
        <div className="cols-span-2 row-span-1 w-full h-full flex justify-center items-center">
          <LoadingCircle size={"md"} />
        </div>
      )}
      {books?.content &&
        books.content.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id}>
            <BookInfoWithHover book={book} />
          </Link>
        ))}
    </section>
  );
}
