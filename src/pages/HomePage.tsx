import Carousel from "@/components/Carousel";
import Navbar from "@/components/common/navbar/Navbar";
import FeaturedBooks from "@/components/featured/FeaturedBooks";
import Footer from "@/components/Footer.tsx";

export default function Home() {
  return (
    <main className="w-full h-screen antialiased">
      <Navbar />
      <div className="w-full h-fit -z-20">
        <Carousel />
      </div>
      <div className="p-3 md:p-20 w-full h-full">
        <FeaturedBooks />
      </div>
      <Footer />
    </main>
  );
}
