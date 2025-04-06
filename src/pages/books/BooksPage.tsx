import BookSection from "@/components/book/BookSection.tsx";
import Navbar from "@/components/common/navbar/Navbar.tsx";
import GenreOptions from "@/components/genre/GenreOptions.tsx";

export function BooksPage() {
  return (
    <main className={"w-full h-screen min-h-[100dvh] antialiased"}>
      <div className={"w-full h-fit"}>
        <Navbar />
      </div>
      <div className={"w-full h-fit"}>
        <GenreOptions />
      </div>
      <div className="w-full h-fit">
        <BookSection />
      </div>
    </main>
  );
}
