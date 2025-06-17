import { Genre } from "@/types/Book";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { memo, useState } from "react";

interface ExploreDropdownProps {
  genres: Genre[] | null;
}

function ExploreDropdown({ genres }: ExploreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!genres) return null;

  return (
    <motion.button
      onClick={() => setIsOpen(!isOpen)}
      className={
        "inline-flex items-center gap-1 relative isolate text-lg  font-medium font-serif text-black bg-transparent"
      }
    >
      <p className="font-serif hover:cursor-pointer text-md">Explore</p>
      <ChevronDownIcon
        className={`size-4 transition-all duration-200 ease-in-out hover:cursor-pointer ${
          isOpen && "rotate-180"
        }`}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onMouseLeave={() => setIsOpen(false)}
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className={
              "absolute right-0 bg-primary top-8 max-w-xs min-h-40 min-w-xl rounded-lg p-4 "
            }
          >
            <div className="inline-flex justify-start">
              <div className="relative">
                <a
                  href="/books"
                  className="text-nowrap block w-fit group px-3 py-2 text-md text-white font-serif text-left hover:text-gray-300 transition-colors duration-200 ease-in-out"
                >
                  Feature Stories
                  <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-gray-100 transition-all duration-200 ease-in-out border-solid"></div>
                </a>
                <a
                  href="/authors"
                  className="text-nowrap block w-fit group px-3 py-2 text-md text-white font-serif text-left hover:text-gray-300 transition-colors duration-200 ease-in-out"
                >
                  Popular Authors
                  <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-gray-100 transition-all duration-200 ease-in-out border-solid"></div>
                </a>
                <a
                  href="/authors"
                  className="text-nowrap block w-fit group px-3 py-2 text-md text-white font-serif text-left hover:text-gray-300 transition-colors duration-200 ease-in-out"
                >
                  New Releases
                  <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-gray-100 transition-all duration-200 ease-in-out border-solid"></div>
                </a>
                <a
                  href="/authors"
                  className="text-nowrap block w-fit group px-3 py-2 text-md text-white font-serif text-left hover:text-gray-300 transition-colors duration-200 ease-in-out"
                >
                  Collaborative Works
                  <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-gray-100 transition-all duration-200 ease-in-out border-solid"></div>
                </a>
              </div>
              <div className="ml-2">
                <h2 className="text-lg font-serif text-white font-medium">
                  Genres
                </h2>
                <div className="mt-2 space-x-2 flex flex-wrap">
                  {genres.map(({ id, name }) => (
                    <a
                      key={id}
                      href={`/genres/${id}`}
                      className="w-fit group px-3 py-2 text-md text-white font-serif text-left hover:text-gray-300 transition-colors duration-200 ease-in-out"
                    >
                      {name}
                      <div className="w-0 group-hover:h-0 group-hover:w-full border-b border-gray-100 transition-all duration-200 ease-in-out border-solid"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default memo(ExploreDropdown);
