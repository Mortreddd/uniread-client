import BookSection from "@/components/book/BookSection.tsx";
import GenreOptions from "@/components/genre/GenreOptions.tsx";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";

export function BooksPage() {
  return (
    <>
      <header className={"w-full"}>
        <GuestNavbar />
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
