import { Fragment, useEffect, useRef, useState } from "react";
import romanceBackground from "@/assets/backgrounds/Romance.webp";
import horrorBackground from "@/assets/backgrounds/Horror.webp";
import scienceFictionBackground from "@/assets/backgrounds/Sciencefiction.webp";
import historicalFictionBackground from "@/assets/backgrounds/Historicalfiction.webp";

export default function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const carouselWrapperRef = useRef<HTMLDivElement | null>(null);
  const SLIDE_IMAGE_WIDTH: number = window.innerWidth;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (carouselWrapperRef.current) {
      carouselWrapperRef.current.style.transform = `translateX(-${
        selectedIndex * SLIDE_IMAGE_WIDTH
      }px)`;
    }
  }, [selectedIndex, SLIDE_IMAGE_WIDTH]);

  return (
    <Fragment>
      <section
        className="relative h-[28rem] overflow-x-hidden"
        style={{ width: SLIDE_IMAGE_WIDTH }}
      >
        <div
          ref={carouselWrapperRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ width: SLIDE_IMAGE_WIDTH * 4 }}
        >
          <div
            className="h-[28rem] bg-center bg-cover bg-no-repeat blur-sm flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${romanceBackground})`,
              width: SLIDE_IMAGE_WIDTH,
            }}
          >
            <h1 className="text-md font-sans">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              numquam, eum expedita iusto provident itaque veritatis, sint
              corrupti, repudiandae voluptatibus fugit accusamus aut veniam
              doloremque aperiam magnam tenetur dolorem tempore.
            </h1>
          </div>
          <div
            className="h-[28rem] bg-center bg-cover bg-no-repeat flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${horrorBackground})`,
              width: SLIDE_IMAGE_WIDTH,
            }}
          >
            <h1 className="text-md font-sans">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              numquam, eum expedita iusto provident itaque veritatis, sint
              corrupti, repudiandae voluptatibus fugit accusamus aut veniam
              doloremque aperiam magnam tenetur dolorem tempore.
            </h1>
          </div>
          <div
            className="h-[28rem] bg-center bg-cover bg-no-repeat flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${scienceFictionBackground})`,
              width: SLIDE_IMAGE_WIDTH,
            }}
          >
            <h1 className="text-md font-sans">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              numquam, eum expedita iusto provident itaque veritatis, sint
              corrupti, repudiandae voluptatibus fugit accusamus aut veniam
              doloremque aperiam magnam tenetur dolorem tempore.
            </h1>
          </div>
          <div
            className="h-[28rem] bg-center bg-cover bg-no-repeat flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${historicalFictionBackground})`,
              width: SLIDE_IMAGE_WIDTH,
            }}
          >
            <h1 className="text-md font-sans">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
              numquam, eum expedita iusto provident itaque veritatis, sint
              corrupti, repudiandae voluptatibus fugit accusamus aut veniam
              doloremque aperiam magnam tenetur dolorem tempore.
            </h1>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
