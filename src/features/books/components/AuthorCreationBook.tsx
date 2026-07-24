import {
  ArrowUpRightIcon,
  EyeIcon,
  HeartIcon,
  NumberedListIcon,
} from "@heroicons/react/24/outline";
import GenreBadge from "./GenreBadge";
import { BookDetail } from "../types/Book";
import { motion } from "motion/react";

export default function AuthorCreationBook({ book }: { book: BookDetail }) {
  return (
    <motion.figure
      initial={{
        opacity: 0,
        y: -4,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        ease: "easeOut",
        duration: 0.4,
      }}
      whileHover={{
        opacity: 0.8,
      }}
      className="flex h-24 md:h-40 relative overflow-hidden rounded lg:rounded-lg shadow-lg bg-gray-200 dark:bg-slate-800 group cursor-pointer"
    >
      <a href={`/books/${book.id}`} className="inset-0 absolute"></a>
      <img
        src={book.coverPhoto}
        alt={book.title}
        className=" aspect-[3/4] h-full object-center object-cover shrink-0"
      />
      <figcaption className="flex-1 p-2 flex flex-col justify-between md:p-2.5">
        <div className=" flex flex-col gap-0.5 md:gap-1.5">
          <h1 className="font-newsreader text-tiny md:text-xl line-clamp-1 text-black dark:text-white tracking-tight">
            {book.title}
          </h1>
          <div className="inline-flex items-center gap-1.5">
            {book.genres.map(({ id, name }) => (
              <GenreBadge key={id} name={name} textSize={"extratiny"} />
            ))}
          </div>
          <div className="flex gap-0.5 md:gap-1 lg:gap-2 items-center">
            <p className="text-gray-600 dark:text-gray-400 font-sans inline-flex items-center">
              <HeartIcon
                fill={"currentColor"}
                className={
                  "size-2 md:size-4 text-red-600 dark:text-red-400 mr-0.5 md:mr-1 lg:mr-1.5"
                }
              />
              <span className="text-extratiny md:text-xs lg:text-xs tracking-wide">
                4.8k
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-sans inline-flex items-center">
              <EyeIcon
                className={
                  "size-2 md:size-4 text-gray-600 dark:text-gray-400 mr-0.5 md:mr-1 lg:mr-1.5"
                }
              />
              <span className="text-extratiny md:text-xs lg:text-xs tracking-wide">
                67k
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-sans inline-flex items-center">
              <NumberedListIcon
                className={
                  "size-2 md:size-4 text-gray-600 dark:text-gray-400 mr-0.5 md:mr-1 lg:mr-1.5"
                }
              />
              <span className="text-extratiny md:text-xs lg:text-xs tracking-wide">
                25 chapters
              </span>
            </p>
          </div>
        </div>
        <div className="inline-flex items-center group gap-1">
          <p className="font-bold text-extratiny md:text-xs lg:text-sm text-sky-700 group-hover:text-sky-800 dark:text-sky-300 dark:group-hover:text-sky-200 group-hover:text-shadow-lg group-hover:-translate-y-1 translate-y-0 transition-all duration-200 ease-in-out uppercase">
            View Details
          </p>
          <ArrowUpRightIcon
            className={
              "size-2 md:size-4 lg:size-5 text-sky-700 group-hover:text-sky-800 dark:text-sky-300 dark:group-hover:text-sky-200 transition-all-duration-200 ease-in-out uppercase group-hover:-translate-y-1 group-hover:translate-x-1 translate-0 transition-all duration-200"
            }
          />
        </div>
      </figcaption>
    </motion.figure>
  );
}
