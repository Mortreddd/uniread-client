import { Chapter } from "@/types/Chapter";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

interface ChapterDropdownProps {
  chapters: Chapter[];
  onClick: (currentChapterId: string | undefined) => void;
}

export default function ChaptersDropdown({
  chapters,
  onClick,
}: ChapterDropdownProps) {
  if (chapters.length <= 0) return null;
  const [open, setOpen] = useState<boolean>(false);
  const { chapterId: currentChapterId } = useParams<{ chapterId: string }>();

  // for displaying default text
  const displayText: string = useMemo(() => {
    if (chapters.length <= 0) return "Empty chapters";
    const chapter =
      chapters.length > 1
        ? chapters.find((c) => c.id === currentChapterId)
        : chapters[0];
    if (!chapter) return "Empty title";
    return chapter.title;
  }, [chapters, currentChapterId]);

  return (
    <motion.button
      onClick={() => setOpen(!open)}
      className={
        "inline-flex items-center justify-between border border-primary rounded w-60 gap-2 px-5 py-2 text-left  relative isolate text-lg font-medium font-serif text-black bg-transparent"
      }
    >
      <p className="text-md font-serif font-semibold truncate text-ellipsis text-gray-800">
        {displayText}
      </p>
      <ChevronDownIcon
        className={`size-4 transition-all duration-200 ease-in-out hover:cursor-pointer ${
          open && "rotate-180"
        }`}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            onMouseLeave={() => setOpen(false)}
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
              "absolute inset-x-0 text-start bg-white top-10 text-gray-800 w-60 rounded-lg overflow-hidden"
            }
          >
            {chapters.length > 0 ? (
              chapters.map(({ id, title, bookId }) => (
                <li
                  key={id}
                  className="block relative isolate px-5 py-2 text-left hover:bg-gray-200 transition-all duration-200 ease-in-out hover:cursor-pointer"
                >
                  <NavLink
                    className="w-full"
                    to={`/books/${bookId}/chapters/${id}`}
                  >
                    {title}
                    <span
                      className="absolute inset-0"
                      onClick={() => onClick(id)}
                    ></span>
                  </NavLink>
                </li>
              ))
            ) : (
              <li className="min-h-52 min-w-96">
                <p className="text-lg font-serif text-gray-800">
                  No chapters available
                </p>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
