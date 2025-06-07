import { useGetBookById } from "@/api/books/useGetBookById.ts";
import { BookCover } from "@/components/book/BookCover.tsx";
import BookDetails from "@/components/book/BookDetails.tsx";
import FeaturedBooks from "@/components/featured/FeaturedBooks.tsx";
import Footer from "@/components/Footer.tsx";
import { useParams } from "react-router-dom";
import defaultBookCover from "@/assets/cover6.jpg";
import BookCommentsSection from "@/components/book/BookCommentsSection.tsx";
import ChapterSection from "@/components/chapter/ChapterSection.tsx";
import { BookStatus } from "@/types/Enums.ts";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export default function BookDescription() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book } = useGetBookById({
    id: bookId,
    status: BookStatus.PUBLISHED,
  });
  return (
    <>
      <header className={'w-full'}>
        <Navbar />
      </header>
      <div className="w-full p-10 h-full">
        <section className="w-full my-5 flex md:flex-row flex-col h-fit bg-gray-100 rounded-lg p-4">
          <div className="mx-5">
            <BookCover size={"jumbotron"} src={defaultBookCover} />
          </div>
          <div className="flex-1">
            <BookDetails book={book} />
          </div>
        </section>
        <section className="w-full grid grid-cols-2 grid-flow-row gap-4 min-h-52 h-fit">
          <div className={"flex-1 col-span-1 row-span-1"}>
            <ChapterSection bookId={bookId} />
          </div>
          <div className={"flex-1 col-span-1 row-span-1"}>
            <BookCommentsSection bookId={bookId} />
          </div>
        </section>
      </div>
      <div className="p-3 md:p-10 w-full h-full">
        <FeaturedBooks />
      </div>
      <Footer />
    </>
  );
}
