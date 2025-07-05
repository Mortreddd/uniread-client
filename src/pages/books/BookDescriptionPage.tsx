import { useGetBookById } from "@/api/books/useGetBookById.ts";
import { BookCover } from "@/components/book/BookCover.tsx";
import BookDetails from "@/components/book/BookDetails.tsx";
import Footer from "@/components/Footer.tsx";
import { useParams } from "react-router-dom";
import defaultBookCover from "@/assets/cover6.jpg";
import ChapterSection from "@/components/chapter/ChapterSection.tsx";
import { BookStatus } from "@/types/Enums.ts";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";
import BookReviewSection from "@/components/book/BookReviewSection";
import { motion } from "motion/react";

export default function BookDescription() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book } = useGetBookById({
    id: bookId,
    status: BookStatus.PUBLISHED,
  });

  return (
    <>
      <header className={"w-full relative"}>
        <GuestNavbar />
      </header>
      <div className="w-full px-10 mb-5">
        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
            opacity: 100,
            y: 0,
          }}
          className="w-full my-5 flex md:flex-row flex-col h-fit bg-gray-100 rounded-lg p-4"
        >
          <div className="mx-5">
            <BookCover size={"jumbotron"} src={defaultBookCover} />
          </div>
          <div className="flex-1">
            <BookDetails book={book} />
          </div>
        </motion.section>
        <section className="w-full flex gap-4">
          <motion.div
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
              x: 0,
              opacity: 100,
            }}
            className="flex-1 flex"
          >
            <BookReviewSection bookId={bookId} />
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 10,
            }}
            animate={{
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
              x: 0,
              opacity: 100,
            }}
            className={"flex-1 min-h-52 flex flex-col"}
          >
            <ChapterSection bookId={bookId} />
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
}
