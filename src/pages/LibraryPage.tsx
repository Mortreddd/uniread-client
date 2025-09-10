import { Input } from "@/components/common/form/Input";
import AuthenticatedNavbar from "@/components/common/navbar/AuthenticatedNavbar";
import { motion } from "motion/react";
import { useState } from "react";
import defaultCover from "@/assets/cover6.jpg";
import { Button } from "@/components/common/form/Button";
import { NavLink } from "react-router-dom";
import { Book } from "@/types/Book";
import { BookmarkIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = ["All(281)", "Reading(12)", "Completed(156)", "Saved(24)"];

  return (
    <>
      <header className="w-full">
        <AuthenticatedNavbar />
      </header>
      <div className="w-full min-h-[80vh] h-fit pt-2 px-10 flex justify-center items-start">
        <aside className="w-xs h-fit mr-6 top-0 sticky font-serif">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="relative mb-3"
          >
            <h1 className="my-3 font-medium text-gray-800 inline-block text-2xl">
              My Library
            </h1>
            <div className="relative rounded border divide-gray-200 min-w-xs divide-y-2 shadow-lg">
              <ul className="w-full p-2">
                <li className="relative w-full">
                  <NavLink
                    to={"/saved-books"}
                    className="text-md text-primary flex items-center relative group p-2" // Added group class
                  >
                    <BookOpenIcon className="w-5 h-5 mr-2 group-hover:text-white" />
                    <span className="group-hover:text-white transition-colors duration-200">
                      Saved Books
                    </span>
                    <span className="absolute inset-0 transition-all duration-200 ease-in-out rounded group-hover:bg-primary/80 bg-transparent -z-10"></span>
                  </NavLink>
                </li>
                <li className="relative w-full">
                  <NavLink
                    to={"/bookmarks"}
                    className="text-md text-primary flex items-center relative group p-2" // Added group class
                  >
                    <BookmarkIcon className="w-5 h-5 mr-2 group-hover:text-white" />
                    <span className="group-hover:text-white transition-colors duration-200">
                      Bookmarks
                    </span>
                    <span className="absolute inset-0 transition-all duration-200 ease-in-out rounded group-hover:bg-primary/80 bg-transparent -z-10"></span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        </aside>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          className={"flex-1"}
        >
          <div className="rounded-lg w-full h-full bg-gray-50 p-4">
            <h1 className="block font-serif font-medium text-3xl text-gray-800">
              Saved Books
            </h1>
            <div className="mt-5">
              <Input
                inputSize={"lg"}
                variant={"primary"}
                placeholder={"Search your library"}
                className={"w-full"}
              />
            </div>
            <div className="mt-5 relative flex items-center">
              {tabs.map((tab, index) => (
                <p
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`${
                    index === activeTab
                      ? "text-primary border-b border-solid border-primary hover:text-primary/80"
                      : "text-gray-500 hover:text-gray-600"
                  } px-4 py-2 font-thin font-serif transition-all duration-200 ease-in-out cursor-pointer`}
                >
                  {tab}
                </p>
              ))}
            </div>

            <div className="relative p-4 grid gap-5 grid-cols-3"></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function BookItem({ book }: { book: Book }) {
  return (
    <div className="col-span-1 rounded-lg font-serif p-4 border-y-2 border-x space-y-1.5 border-primary border-solid transition-all duration-200 ease-in-out translate-y-0 hover:-translate-y-2 hover:shadow-lg">
      <img
        src={defaultCover}
        alt="Book Cover"
        className="w-full h-auto object-cover min-h-48 object-center aspect-video rounded-md"
      />
      <h6 className="text-gray-800 font-medium truncate line-clamp-1">
        {book.title}
      </h6>
      <a
        href="#"
        className="text-sm font-thin text-blue-600 transition-all duration-200 ease-in-out hover:text-blue-700"
      >
        by {book.user.fullName}
      </a>
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-700 font-thin">Fantasy</p>
        <p className="text-xs text-gray-700 font-thin">Science Fiction</p>
      </div>
      <p className="text-xs text-gray-700 font-thin">45 chapters</p>
      <div className="flex items-center gap-2 justify-center">
        <Button variant={"primary"} className={"flex-1 rounded-xs text-sm"}>
          Continue
        </Button>
        <Button
          variant={"inactivePrimary"}
          className={"flex-1 rounded-xs text-sm"}
        >
          <a href="/review">Review</a>
        </Button>
      </div>
    </div>
  );
}
