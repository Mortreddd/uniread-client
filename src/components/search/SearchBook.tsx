import {Link, useSearchParams} from "react-router-dom";
import BookSearched from "../book/BookSearched";
import {useGetBooks} from "@/api/books/useGetBooks";
import {useState} from "react";
import {BookParams} from "@/types/Book.ts";
import {BookStatus} from "@/types/Enums.ts";

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
  const [{ pageNo, pageSize, query: search, status }] =
    useState<BookParams>({
      pageNo: 0,
      pageSize: 20,
      query: query || "",
      status: BookStatus.PUBLISHED
    });

  const { data } = useGetBooks({ pageNo, pageSize, query: search, status });

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
