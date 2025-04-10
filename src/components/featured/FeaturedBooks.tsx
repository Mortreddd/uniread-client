import { useMemo, useState } from "react";
import Book from "../book/Book";
import withHover from "../withHover";
import { PaginateParams } from "@/types/Pagination";
import { useGetBooks } from "@/api/books/useGetBooks";
import LoadingCircle from "../LoadingCirlce";
import { Book as BookType } from "@/types/Book";
import { Link } from "react-router-dom";

export default function FeaturedBooks() {
  const [{ pageNo, pageSize, query }, setParams] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
  });
  const { data, loading } = useGetBooks({ pageNo, pageSize, query });

  const memoizedBooks: BookType[] = useMemo(() => {
    if (!data?.content) return [];
    return data.content;
  }, [data]);

  const BookWithHover = withHover(Book);
  return (
    <div className="w-full h-fit">
      <h3 className="text-xl mb-4 text-gray-500 font-sans font-medium text-left">
        MOST READ BOOKS
      </h3>
      <div className="w-full h-fit flex items-start gap-3 flex-wrap">
        {loading && !data?.content ? (
          <LoadingCircle />
        ) : !loading && memoizedBooks.length !== 0 ? (
          memoizedBooks.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id}>
              <BookWithHover
                book={book}
                variant={"custom"}
                className="rounded"
              />
            </Link>
          ))
        ) : (
          !loading &&
          memoizedBooks.length === 0 && (
            <h1 className="text-2xl text-primary font-sans">
              No available books
            </h1>
          )
        )}
      </div>
    </div>
  );
}
