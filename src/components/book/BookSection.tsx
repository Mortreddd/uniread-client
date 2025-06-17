import { useSearchParams } from "react-router-dom";
import LoadingCircle from "../LoadingCirlce";
import withHover from "../withHover";
import BookInfo from "./BookInfo";
import { Book, BookParams } from "@/types/Book";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookStatus } from "@/types/Enums.ts";
import { useGetBooks } from "@/api/books/useGetBooks.ts";

export default function BookSection() {
  const [params] = useSearchParams();
  const observerRef = useRef<HTMLDivElement>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const memoizedIds: number[] = useMemo(
    () => params.getAll("genres").map(Number),
    [params]
  );
  const BookInfoWithHover = withHover(BookInfo);
  const [{ pageNo, pageSize, query, status }, setState] = useState<BookParams>({
    pageNo: 0,
    pageSize: 10,
    query: "",
    status: BookStatus.PUBLISHED,
  });

  const { data, loading } = useGetBooks({
    genres: memoizedIds,
    pageNo,
    pageSize,
    query,
    status,
  });

  console.log(data);

  /**
   * This function is called when the bottom of the book section is reached.
   * It increments the page number to load more books if there are more books to load.
   */
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
      pageSize: 10,
      query: "",
      genres: memoizedIds,
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
      {loading && !data?.content ? (
        <div className="cols-span-2 row-span-1 flex justify-center items-center">
          <LoadingCircle size={"md"} />
        </div>
      ) : !loading && books.length > 0 ? (
        books.map((book) => <BookInfoWithHover key={book.id} book={book} />)
      ) : (
        <div className="col-span-2 row-span-1 flex justify-center items-center">
          <h2 className="text-2xl font-serif font-medium">No books found</h2>
        </div>
      )}
      {!data?.last && <div ref={observerRef}></div>}
    </section>
  );
}
