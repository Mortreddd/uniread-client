import BookSection from "@/components/book/BookSection.tsx";
import GenreFilter from "@/components/genre/GenreFilter.tsx";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";

export default function BooksPage() {
  return (
    <>
      <header className={"w-full"}>
        <GuestNavbar />
      </header>
      <div className={"w-full h-fit"}>
        <GenreFilter />
      </div>
      <div className="w-full h-fit">
        <BookSection />
      </div>
    </>
  );
}
