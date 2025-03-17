import Carousel from "@/components/Carousel";
import Navbar from "@/components/common/navbar/Navbar";
import FeaturedBooks from "@/components/featured/FeaturedBooks";
import { Fragment } from "react";
import Footer from "@/components/Footer.tsx";

export default function Home() {
  return (
    <Fragment>
      <div className="w-full h-full">
        <Navbar />
        <div className="w-full h-fit -z-20">
          <Carousel />
        </div>
        <div className="p-3 md:p-20 w-full h-full">
          <FeaturedBooks />
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}
