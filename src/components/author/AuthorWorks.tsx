import {Link} from "react-router-dom";
import useGetUserBooks from "@/api/books/useGetUserBooks.ts";
import {useEffect, useState} from "react";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import Book from "@/components/book/Book.tsx";
import withHover from "@/components/withHover.tsx";
import {Book as BookType, BookParams} from "@/types/Book";
import {BookStatus} from "@/types/Enums.ts";
import {useAuthorInfo} from "@/components/author/AuthorProfileDescription.tsx";

export default function AuthorWorks() {
  const { author } = useAuthorInfo();
  const BookWithHover = withHover(Book);
  const [{ pageNo, pageSize, query, status }] = useState<BookParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
    status: BookStatus.PUBLISHED
  });

  const { data, loading } = useGetUserBooks({userId: author?.id, pageNo, pageSize, query, status});
  const [books, setBooks] = useState<BookType[]>([]);
  useEffect(() => {
    if (data?.content) {
      setBooks(data.content);
    }
  }, [data]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-6 gap-4 grid-flow-row px-16 py-6">
        {loading && !data?.content ? (
            <div className={'w-full h-full place-items-center col-span-6'}>
              <LoadingCircle />
            </div>
        ) : (!loading && books.length !== 0 ? (
          books.map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className={"col-span-1"}
            >
              <BookWithHover
                book={book}
                className="rounded"
                size={"default"}
                variant={"custom"}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-6 row-span-1 w-full h-full flex justify-center items-center text-primary font-serif font-medium text-xl">
            No books available
          </div>
        )
        )}
      </div>
    </>
  );
}
