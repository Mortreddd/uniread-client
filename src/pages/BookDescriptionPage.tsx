import { useGetBookById } from "@/api/books/useGetBookById";
import { BookCover } from "@/components/book/BookCover";
import BookDetails from "@/components/book/BookDetails";
import Comment from "@/components/comment/Comment";
import Navbar from "@/components/common/navbar/Navbar";
import FeaturedBooks from "@/components/featured/FeaturedBooks";
import Footer from "@/components/Footer.tsx";
import { useParams } from "react-router-dom";
import defaultBookCover from "@/assets/cover6.jpg";
import { Suspense } from "react";
import LoadingCircle from "@/components/LoadingCirlce";

export default function BookDescription() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, loading, error } = useGetBookById(bookId);
  return (
    <Suspense
      fallback={
        <div
          className={"w-full h-fit min-h-52 flex justify-center items-center"}
        >
          <LoadingCircle />
        </div>
      }
    >
      <main className="w-full h-full antialiased font-sans scroll-m-10 scroll-smooth">
        <Navbar />
        <div className="w-full p-10 h-full">
          <section className="w-full my-5 flex md:flex-row flex-col h-fit bg-gray-100 rounded-lg p-4">
            <div className="mx-5">
              <BookCover size={"jumbotron"} src={defaultBookCover} />
            </div>
            <div className="flex-1">
              <BookDetails book={book} />
            </div>
          </section>
          <section className="w-fit p-4 h-fit bg-gray-100">
            <Comment />
            <Comment />
            <Comment />
          </section>
        </div>
        <div className="p-3 md:p-10 w-full h-full">
          <FeaturedBooks />
        </div>
        <Footer />
      </main>
    </Suspense>
  );
}
