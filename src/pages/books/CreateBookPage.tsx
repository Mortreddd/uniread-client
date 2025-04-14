import CreateBookForm from "@/components/book/partials/CreateBookForm";
import Navbar from "@/components/common/navbar/Navbar.tsx";
import Footer from "@/components/Footer";

export default function CreateBookPage() {
  return (
    <main className={"w-full h-screen antialiased"}>
      <div className={"w-full"}>
        <Navbar />
      </div>

      <div
        className={"w-full max-h-fit flex justify-center items-center py-10"}
      >
        <CreateBookForm />
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </main>
  );
}
