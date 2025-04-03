import { Link, useSearchParams } from "react-router-dom";
import BookSearched from "../book/BookSearched";
import { useGetBooks } from "@/api/books/useGetBooks";
import { useState } from "react";
import { PaginateParams } from "@/types/Pagination";

/**
 * The book tab in search page
 * @returns
 */

export default function SearchBook() {
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  // TODO: remove the @ts-ignore comment before deploying the application
  // @ts-ignore
  const [{ pageNo, pageSize, query: search }, setParams] =
    useState<PaginateParams>({
      pageNo: 0,
      pageSize: 20,
      query: query || "",
    });

  const { data } = useGetBooks({ pageNo, pageSize, query: search });

  console.log(data);
  return (
    <>
      <section className="grid grid-cols-2 grid-flow-row gap-2 md:gap-4 w-full h-full">
        {data?.content.map((book) => (
          <Link to={`/books/${book.id}`} className="col-span-1">
            <BookSearched book={book} />
          </Link>
        ))}
      </section>
    </>
  );
}
