import CreateBookForm from "@/components/book/partials/CreateBookForm";
import Footer from "@/components/Footer";
import GuestNavbar from "@/components/common/navbar/GuestNavbar.tsx";

export default function CreateBookPage() {
  return (
    <>
      <header className={"w-full relative"}>
        <GuestNavbar />
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
