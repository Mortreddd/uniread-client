import { BookCover } from "@/components/book/BookCover";
import BookDetails from "@/components/book/BookDetails";
import Comment from "@/components/comment/Comment";
import Navbar from "@/components/common/navbar/Navbar";
import FeaturedBooks from "@/components/featured/FeaturedBooks";
import Footer from "@/components/Footer.tsx";

export default function BookDescription() {
  return (
    <main className="w-full h-full antialiased font-sans scroll-m-10 scroll-smooth">
      <Navbar />
      <div className="w-full p-10 h-full">
        <section className="w-full my-5 flex md:flex-row flex-col h-fit bg-gray-100 rounded-lg p-4">
          <div className="mx-5">
            <BookCover size={"jumbotron"} />
          </div>
          <div className="flex-1">
            <BookDetails />
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
  );
}
