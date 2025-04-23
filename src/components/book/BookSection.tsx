import { useSearchParams } from "react-router-dom";
import LoadingCircle from "../LoadingCirlce";
import withHover from "../withHover";
import BookInfo from "./BookInfo";
import { Book, BookParams } from "@/types/Book";
import { useEffect, useMemo, useRef, useState } from "react";
import useGetBooksByGenreIds from "@/api/books/useGetBooksByGenreIds";
import { BookStatus } from "@/types/Enums.ts";

export default function BookSection() {
  // @ts-ignore
  const [params, setParams] = useSearchParams();
  const observerRef = useRef<HTMLDivElement>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const memoizedIds: number[] = useMemo(
    () => params.getAll("genres").map(Number),
    [params]
  );
  const BookInfoWithHover = withHover(BookInfo);
  // @ts-ignore
  const [{ pageNo, pageSize, query, status }, setState] = useState<BookParams>({
    pageNo: 0,
    pageSize: 5,
    query: "",
    status: BookStatus.PUBLISHED,
  });

  const { data, loading } = useGetBooksByGenreIds({
    genreIds: memoizedIds,
    pageNo,
    pageSize,
    query,
    status,
  });

  const onBottomReach = () => {
    if (!data || data.last) return;
    setState((prev) => ({ ...prev, pageNo: (prev.pageNo ?? 0) + 1 }));
  };

  /**
   * This effect is used to reset the page number and page size when the genre ids change.
   */
  useEffect(() => {
    setState({
      pageNo: 0,
      pageSize: 5,
      query: "",
      status: BookStatus.PUBLISHED,
    });
  }, [memoizedIds]);

  /**
   * This effect is used to update the books state when the data changes.
   * It filters out duplicate books based on their ids.
   */
  useEffect(() => {
    if (!data) return;

    setBooks((prevBooks) => {
      if (pageNo === 0) return data.content;
      return [
        ...prevBooks,
        ...data.content.filter((b) => !prevBooks.some((pb) => pb.id === b.id)),
      ];
    });
  }, [pageNo, data, memoizedIds]);

  /**
   * * This effect is used to observe the bottom of the book section and load more books when it is reached.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onBottomReach();
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [data]);

  return (
    <section className="w-full h-fit px-10 py-5 grid grid-cols-2 grid-flow-row gap-5">
      {loading && books.length === 0 && (
        <div className="cols-span-2 row-span-1 w-full h-full flex justify-center items-center">
          <LoadingCircle size={"md"} />
        </div>
      )}
      {books.map((book) => (
        <BookInfoWithHover key={book.id} book={book} />
      ))}
      <div ref={observerRef}></div>
    </section>
  );
}
