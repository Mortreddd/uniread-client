import CreateBookForm from "@/components/book/partials/CreateBookForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/common/navbar/Navbar.tsx";

export default function CreateBookPage() {
  return (
      <>
          <header className={"w-full relative"}>
              <Navbar />
          </header>
    <div className="h-full w-full">

      <div
        className={"w-full max-h-fit flex justify-center items-center py-10"}
      >
        <CreateBookForm />
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </div>
          </>
  );
}
