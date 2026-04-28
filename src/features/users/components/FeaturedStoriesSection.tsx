import featuredAuthor1 from "@/assets/hero-featured-author1.png";
import featuredAuthor2 from "@/assets/hero-featured-author2.png";
import { Button } from "@/shared/components/form/Button";
import { Input } from "@/shared/components/form/Input";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import FeaturedUser from "./FeaturedUser";
import { motion } from "motion/react";

export default function FeaturedStoriesSection() {
  return (
    <motion.div
      initial={{
        translateY: -10,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
        transition: {
          ease: "backInOut",
          duration: 0.4,
        },
      }}
      className="size-full overflow-hidden max-w-full"
    >
      <h1 className="text-lg md:text-xl lg:text-xl font-newsreader font-bold text-black dark:text-white mb-1 md:mb-2.5">
        Featured Authors
      </h1>
      <p className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-200 mb-2 md:3">
        Meet the architects of worlds and masters of prose
      </p>
      {/* Featured Book Section */}
      <div className="w-full flex items-center h-32 sm:h-40 md:h-48 lg:h-60 gap-2 md:gap-3 overflow-x-auto no-scrollbar mask-x-from-95% px-3 md:px-6 mb-4 md:mb-5 max-w-full">
        <div
          className={`aspect-[16/9] shrink-0 rounded lg:rounded-lg h-full overflow-hidden relative`}
        >
          <img
            src={featuredAuthor1}
            alt="featured-author-1"
            className="size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181c22] to-transparent"></div>
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 space-y-1 md:space-y-1.5">
            <span className="size-fit text-nano sm:text-extratiny md:text-tiny lg:text-xs font-medium px-1.5 py-0.5 bg-amber-600 text-gray-300 rounded shadow">
              Editor's Choice
            </span>
            <h1 className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-serif font-bold">
              Evelyn Thorne
            </h1>
            <p className="text-extratiny md:text-tiny lg:text-sm font-sans text-gray-300 line-clamp-2 font-medium md:line-clamp-3 tracking-tight">
              Best selling author of 'The Whispering Pines' series. Exploring
              the interactions of folklore and urban decay.
            </p>
            <Button
              className={
                "inline-flex items-center rounded text-tiny md:text-xs lg:text-base"
              }
            >
              <span className="text-white">Start Reading</span>
              <ArrowRightIcon
                className={
                  "ml-1 size-3 text-white md:size-4 lg:size-5 translate-x-0 hover:translate-x-3 transition-all duration-200 ease-in-out"
                }
              />
            </Button>
          </div>
        </div>
        <div
          className={`aspect-[16/9] shrink-0 rounded lg:rounded-lg h-full overflow-hidden relative`}
        >
          <img
            src={featuredAuthor2}
            alt="featured-author-1"
            className="size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181c22] to-transparent"></div>
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 space-y-1 md:space-y-1.5">
            <span className="size-fit text-nano sm:text-extratiny md:text-tiny lg:text-xs font-medium px-1.5 py-0.5 bg-blue-600 text-gray-300 rounded shadow">
              Rising Star
            </span>
            <h1 className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-serif font-bold">
              Marcus Vance
            </h1>
            <p className="text-extratiny md:text-tiny lg:text-sm font-sans text-gray-300 line-clamp-2 font-medium md:line-clamp-3 tracking-tight">
              Redefining hard science fiction for the modern age with his
              'Circuit Soul' trilogy.
            </p>
            <Button
              className={
                "inline-flex items-center rounded text-tiny md:text-xs lg:text-base"
              }
            >
              <span className="text-white">Start Reading</span>
              <ArrowRightIcon
                className={
                  "ml-1 size-3 text-white md:size-4 lg:size-5 translate-x-0 hover:translate-x-3 transition-all duration-200 ease-in-out"
                }
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <h3 className="font-serif font-bold text-base md:text-lg lg:text-xl text-black dark:text-white">
          Discover More
        </h3>
        <Input
          withSearch={true}
          placeholder={"Search authors..."}
          className={"mr-1"}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-3">
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <FeaturedUser />
        </div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <FeaturedUser />
        </div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <FeaturedUser />
        </div>
        <div className="col-span-6 md:col-span-4 lg:col-span-3">
          <FeaturedUser />
        </div>
      </div>
      <div className="flex justify-center mt-4 md:mt-6">
        <div className="inline-flex items-center gap-3">
          <Button size={"sm"} className={"rounded text-xs md:text-sm"}>
            <ChevronLeftIcon className={"size-4 md:size-7"} />
          </Button>
          <Button className={"rounded text-xs md:text-sm"}>1</Button>
          <Button className={"rounded text-xs md:text-sm"}>2</Button>
          <Button className={"rounded text-xs md:text-sm"}>3</Button>
          <Button size={"sm"} className={"rounded text-xs md:text-sm"}>
            <ChevronRightIcon className={"size-4 md:size-7"} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
