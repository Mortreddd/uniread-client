import BookSection from "@/components/book/BookSection.tsx";
import GenreOptions from "@/components/genre/GenreOptions.tsx";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export function BooksPage() {
  return (
    <>
        <header className={'w-full'}>
            <Navbar />
        </header>
        <div className={"w-full h-fit"}>
        <GenreOptions />
      </div>
      <div className="w-full h-fit">
        <BookSection />
      </div>
    </>
  );
}
