import { BookDetail, BookStatus, Genre } from "@/features/books/types/Book.ts";
import { Gender } from "@/features/users/types/User.ts";
import AppLayout from "@/layouts/AppLayout.tsx";
import { Button } from "@/shared/components/form/Button.tsx";
import Checkbox from "@/shared/components/form/Checkbox.tsx";
import { Input } from "@/shared/components/form/Input.tsx";
import Radio from "@/shared/components/form/Radio.tsx";
import {
  ListBulletIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import author0 from "@/assets/author-0.png";
import author1 from "@/assets/author-1.png";
import author2 from "@/assets/author-2.png";
import author3 from "@/assets/author-3.png";
import author4 from "@/assets/author-4.png";

import book1 from "@/assets/books/book1.png";
import book2 from "@/assets/books/book2.png";
import book3 from "@/assets/books/book3.png";
import book4 from "@/assets/books/book4.png";
import book5 from "@/assets/books/book5.png";
import book6 from "@/assets/books/book6.png";
import book7 from "@/assets/books/book7.png";
import book8 from "@/assets/books/book8.png";
import BookDetailed from "@/features/books/components/BookDetailed.tsx";
import BookCard from "../components/BookCard";
import { AnimatePresence, motion } from "motion/react";

type SortBy = "trending" | "latest" | "most read";
export default function BooksPage() {
  const [isBookDetailed, setIsBookDetailed] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("trending");

  function isGenreSelected(id: number): boolean {
    return selectedGenres.includes(id);
  }

  return (
    <AppLayout>
      <section
        className={
          "flex flex-col size-full relative dark:bg-slate-800 bg-slate-100 p-5 md:p-6 lg:p-10"
        }
      >
        <Input
          className="mx-auto w-full max-w-5xl mb-3 md:mb-5 shrink-0"
          placeholder={"Search for stories, authors, or series..."}
          inputSize={"lg"}
          withSearch={true}
        />
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-3 min-w-0 no-scrollbar">
          {GENRES.map((genre, key) => (
            <Button
              key={key}
              size={"sm"}
              onClick={() =>
                setSelectedGenres((prev) =>
                  prev.includes(genre.id)
                    ? prev.filter((id) => id !== genre.id)
                    : [...prev, genre.id],
                )
              }
              variant={`${isGenreSelected(genre.id) ? "primary" : "inactivePrimary"}`}
              className={"text-nowrap rounded"}
            >
              {genre.name}
            </Button>
          ))}
        </div>
        <div className="flex-1 min-h-0 flex flex-col items-stretch lg:items-start lg:justify-start lg:flex-row">
          <div className={"flex lg:hidden mb-2"}>
            <Button className={"rounded w-full text-sm"}>Apply filters</Button>
          </div>
          <div className="sticky top-0 w-full lg:min-w-60 lg:max-w-fit flex flex-row lg:flex-col gap-2 md:gap-3">
            {/* Sort By section */}
            <div className="flex-1 min-w-0 max-h-fit relative">
              <h6 className="text-sm md:text-base font-sans font-semibold tracking-wide text-black dark:text-white">
                Sort By
              </h6>
              <label
                htmlFor=""
                className="font-semibold flex items-center rounded p-1.5 md:p-2 bg-transparent border not-checked:border-transparent has-checked:bg-primary/60 dark:has-checked:bg-primary-dark/60 hover:bg-primary/60 dark:hover:bg-primary-dark/60 has-checked:text-gray-200 text-gray-800 dark:text-gray-100 font-serif peer-checked:border-primary hover:has-checked:border-transparent hover:has-checked:text-black has-checked:border-primary dark:has-checked:border-primary-dark dark:hover:has-checked:text-white/80  transition-all duration-200 ease-in-out"
              >
                <Radio
                  name={"sortBy"}
                  checked={sortBy === "trending"}
                  onClick={() => setSortBy("trending")}
                  className={"mr-2"}
                  variant={"primary"}
                  radioSize={"sm"}
                />
                <span
                  className={
                    "text-tiny md:text-xs transition-all duration-200 ease-in-out"
                  }
                >
                  Trending
                </span>
              </label>
              <label
                htmlFor=""
                className="font-semibold flex items-center rounded p-1.5 md:p-2 bg-transparent border not-checked:border-transparent has-checked:bg-primary/60 dark:has-checked:bg-primary-dark/60 hover:bg-primary/60 dark:hover:bg-primary-dark/60 has-checked:text-gray-200 text-gray-800 dark:text-gray-100 font-serif peer-checked:border-primary hover:has-checked:border-transparent hover:has-checked:text-black has-checked:border-primary dark:has-checked:border-primary-dark dark:hover:has-checked:text-white/80  transition-all duration-200 ease-in-out"
              >
                <Radio
                  name={"sortBy"}
                  checked={sortBy === "latest"}
                  onClick={() => setSortBy("latest")}
                  className={"mr-2"}
                  variant={"primary"}
                  radioSize={"sm"}
                />
                <span
                  className={
                    "text-tiny md:text-xs transition-all duration-200 ease-in-out"
                  }
                >
                  Latest
                </span>
              </label>
              <label
                htmlFor=""
                className="font-semibold flex items-center rounded p-1.5 md:p-2 bg-transparent border not-checked:border-transparent has-checked:bg-primary/60 dark:has-checked:bg-primary-dark/60 hover:bg-primary/60 dark:hover:bg-primary-dark/60 has-checked:text-gray-200 text-gray-800 dark:text-gray-100 font-serif peer-checked:border-primary hover:has-checked:border-transparent hover:has-checked:text-black has-checked:border-primary dark:has-checked:border-primary-dark dark:hover:has-checked:text-white/80  transition-all duration-200 ease-in-out"
              >
                <Radio
                  name={"sortBy"}
                  checked={sortBy === "most read"}
                  onClick={() => setSortBy("most read")}
                  className={"mr-2"}
                  variant={"primary"}
                  radioSize={"sm"}
                />
                <span
                  className={
                    "text-tiny md:text-xs transition-all duration-200 ease-in-out"
                  }
                >
                  Most Read
                </span>
              </label>
            </div>

            {/* Book status */}
            <div className="flex-1 min-w-0 max-h-fit relative space-y-1 md:space-y-1.5">
              <h6 className="text-sm md:text-base font-sans font-semibold tracking-wide text-black dark:text-white">
                Status
              </h6>
              <div className="flex items-center px-1.5 md:px-2">
                <Checkbox
                  name={"status"}
                  className={"mr-2"}
                  variant={"primary"}
                />
                <p className="text-tiny md:text-xs text-gray-800 dark:text-gray-100 font-semibold font-sans">
                  Ongoing
                </p>
              </div>
              <div className="flex items-center px-1.5 md:px-2">
                <Checkbox
                  name={"status"}
                  className={"mr-2"}
                  variant={"primary"}
                />
                <p className="text-tiny md:text-xs text-gray-800 dark:text-gray-100 font-semibold font-sans">
                  Completed
                </p>
              </div>
            </div>

            {/* Rating range */}
            <div className="flex-1 min-w-0 max-h-fit relative space-y-1 md:space-y-1.5">
              <h6 className="text-sm md:text-base font-sans font-semibold tracking-wide text-black dark:text-white">
                Rating Range
              </h6>
              <div className="flex items-center px-1.5 md:px-2">
                <Checkbox
                  name={"status"}
                  className={"mr-2"}
                  variant={"primary"}
                />
                <p className="text-tiny md:text-xs text-gray-800 dark:text-gray-100 font-semibold font-sans">
                  4.5+
                </p>
                <StarIcon
                  fill={"currentColor"}
                  className={
                    "ml-1 md:ml-2 size-1.5 md:size-2 text-gray-800 dark:text-gray-100"
                  }
                />
              </div>
              <div className="flex items-center px-1.5 md:px-2">
                <Checkbox
                  name={"status"}
                  className={"mr-2"}
                  variant={"primary"}
                />
                <p className="text-tiny md:text-xs text-gray-800 dark:text-gray-100 font-semibold font-sans">
                  4.0+
                </p>
                <StarIcon
                  fill={"currentColor"}
                  className={
                    "ml-1 md:ml-2 size-1.5 md:size-2 text-gray-800 dark:text-gray-100"
                  }
                />
              </div>
              <div className="flex items-center px-1.5 md:px-2">
                <Checkbox
                  name={"status"}
                  className={"mr-2"}
                  variant={"primary"}
                />
                <p className="text-tiny md:text-xs text-gray-800 dark:text-gray-100 font-semibold font-sans">
                  3.5+
                </p>
                <StarIcon
                  fill={"currentColor"}
                  className={
                    "ml-1 md:ml-2 size-1.5 md:size-2 text-gray-800 dark:text-gray-100"
                  }
                />
              </div>
            </div>
            <div className={"hidden lg:flex mt-2"}>
              <Button className={"rounded w-full"}>Apply filters</Button>
            </div>
          </div>

          <div className="flex-1 min-h-0 min-w-0 relative flex flex-col lg:ml-3 ml-0 ">
            <div className="shrink-0 max-h-fit flex items-center justify-between w-full mt-2 md:mt-3 mb-3">
              <p className="font-bold text-gray-800 dark:text-white/80 font-sans text-xs md:text-base">
                Showing 1,240 results
              </p>
              <div className="inline-flex justify-end gap-2">
                {/* Grid Icon */}
                <button
                  onClick={() => setIsBookDetailed(false)}
                  className={`p-1 md:p-1.5 lg:p-2 rounded transition-all text-gray-800 dark:text-gray-200 duration-200 
          ${!isBookDetailed ? "bg-gray-200 dark:bg-slate-700 " : "bg-transparent "}`}
                >
                  <Squares2X2Icon className="size-4 md:size-5" />
                </button>

                {/* List Icon */}
                <button
                  onClick={() => setIsBookDetailed(true)}
                  className={`p-1 md:p-1.5 lg:p-2 rounded transition-all text-gray-800 dark:text-gray-200 duration-200 
          ${isBookDetailed ? "bg-gray-200 dark:bg-slate-700 " : "bg-transparent "}`}
                >
                  <ListBulletIcon className="size-4 md:size-5" />
                </button>
              </div>
            </div>
            <AnimatePresence mode={"wait"}>
              {isBookDetailed ? (
                <motion.div
                  key="list-view"
                  initial={{
                    opacity: 0,
                    translateY: -10,
                  }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 lg:ml-3 ml-0 w-full"
                >
                  {DUMMY_BOOKS.map((book) => (
                    <article key={book.id} className="min-h-28 h-auto w-full">
                      <BookDetailed book={book} />
                    </article>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="grid-view"
                  initial={{
                    opacity: 0,
                    translateY: -10,
                  }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  className="w-full grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 lg:ml-3 ml-0"
                >
                  {DUMMY_BOOKS.map((book) => (
                    <article
                      key={book.id}
                      className="min-h-52 md:min-h-60 w-auto max-w-36 md:max-w-44 lg:min-h-52 "
                    >
                      <BookCard book={book} />
                    </article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full flex items-center justify-center gap-1 5 md:gap-2 mt-3 md:mt-5">
              <Button className={"rounded text-xs md:text-sm"}>1</Button>
              <Button className={"rounded text-xs md:text-sm"}>2</Button>
              <Button className={"rounded text-xs md:text-sm"}>3</Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

const GENRES: Genre[] = [
  {
    id: 1,
    name: "Cyberpunk",
    description:
      "A 'high-tech, low-life' subgenre of science fiction set in a futuristic urban environment, typically featuring social decay and advanced technology.",
  },
  {
    id: 2,
    name: "High Fantasy",
    description:
      "Epic stories set in an entirely fictional world, often featuring magic, mythical creatures, and a struggle against a grand, supernatural evil.",
  },
  {
    id: 3,
    name: "Magical Realism",
    description:
      "A literary style that embeds supernatural or mythic elements into realistic, mundane settings, treating them as normal occurrences.",
  },
  {
    id: 4,
    name: "Victorian Gothic",
    description:
      "A subgenre blending horror and romance, often set in atmospheric 19th-century estates with themes of mystery, ghosts, and psychological tension.",
  },
  {
    id: 5,
    name: "Space Opera",
    description:
      "Large-scale science fiction emphasizing space travel, interstellar warfare, and melodramatic adventure across the stars.",
  },
  {
    id: 6,
    name: "Solarpunk",
    description:
      "An optimistic genre focused on how a sustainable future might look when technology and nature coexist in harmony to solve climate issues.",
  },
  {
    id: 7,
    name: "Neo-Noir",
    description:
      "A modern revival of the film noir style, featuring cynical heroes, dark lighting, and complex moral dilemmas in a contemporary or futuristic setting.",
  },
];

const DUMMY_BOOKS: BookDetail[] = [
  {
    id: "b1-882-xa",
    title: "The Clockwork Courtesan",
    description:
      "In a Victorian era powered by steam and secrets, a mechanical doll discovers she has a soul—and a target on her back.",
    author: {
      id: "auth-001",
      username: "steampunk_queen",
      firstName: "Eleanor",
      lastName: "Vane",
      gender: Gender.FEMALE,
      avatarUrl: author4,
    },
    averageRating: 4.8,
    totalRating: 1240,
    readCount: 45000,
    coverPhoto: book1,
    totalLikes: 8900,
    totalChapters: 42,
    status: BookStatus.PUBLISHED,
    completed: false,
    matured: true,
    genres: [
      {
        id: 4,
        name: "Victorian Gothic",
        description: "Mystery and atmosphere.",
      },
      { id: 1, name: "Cyberpunk", description: "High-tech low-life." },
    ],
    isAddedToLibrary: true,
    createdAt: "2025-11-12T08:30:00Z",
  },
  {
    id: "b2-991-yb",
    title: "Neon Shadows",
    description:
      "A data-thief in Neo-Tokyo accidentally downloads a memory that could restart the world—or end it.",
    author: {
      id: "auth-002",
      username: "glitch_hacker",
      firstName: "Kai",
      lastName: "Sato",
      gender: Gender.MALE,
      avatarUrl: author3,
    },
    averageRating: 4.2,
    totalRating: 850,
    readCount: 12000,
    coverPhoto: book2,
    totalLikes: 3200,
    totalChapters: 15,
    status: BookStatus.HIATUS,
    completed: false,
    matured: true,
    genres: [
      {
        id: 7,
        name: "Neo-Noir",
        description: "Cynical heroes and dark alleys.",
      },
    ],
    isAddedToLibrary: false,
    createdAt: "2026-01-05T14:20:00Z",
  },
  {
    id: "b3-773-zc",
    title: "The Silent Alchemist",
    description:
      "In a world where magic is a currency, a young girl discovers she can create gold from silence.",
    author: {
      id: "auth-003",
      username: "mystery_writer",
      firstName: "Aria",
      lastName: "Bell",
      gender: Gender.OTHER,
      avatarUrl: author2,
    },
    averageRating: 4.9,
    totalRating: 2100,
    readCount: 89000,
    coverPhoto: book3,
    totalLikes: 15000,
    totalChapters: 60,
    status: BookStatus.COMPLETED,
    completed: true,
    matured: false,
    genres: [
      { id: 2, name: "High Fantasy", description: "Epic stories and magic." },
    ],
    isAddedToLibrary: true,
    createdAt: "2024-05-20T10:00:00Z",
  },
  {
    id: "b4-664-wd",
    title: "Coffee and Ghosts",
    description:
      "Running a café is hard enough without the ghost of the previous owner trying to rewrite the menu.",
    author: {
      id: "auth-004",
      username: "brew_master",
      firstName: "Silas",
      lastName: "Vance",
      gender: Gender.MALE,
      avatarUrl: author1,
    },
    averageRating: 4.5,
    totalRating: 540,
    readCount: 8000,
    coverPhoto: book4,
    totalLikes: 1200,
    totalChapters: 24,
    status: BookStatus.PUBLISHED,
    completed: false,
    matured: false,
    genres: [
      {
        id: 3,
        name: "Magical Realism",
        description: "The supernatural in the mundane.",
      },
    ],
    isAddedToLibrary: false,
    createdAt: "2026-02-14T09:15:00Z",
  },
  {
    id: "b5-555-ve",
    title: "Orbit of the Fallen",
    description:
      "An exiled prince must unite rival space colonies to stop a black hole from swallowing their star system.",
    author: {
      id: "auth-005",
      username: "star_gazer",
      firstName: "Nova",
      lastName: "Skye",
      gender: Gender.FEMALE,
      avatarUrl: author3,
    },
    averageRating: 4.7,
    totalRating: 3200,
    readCount: 150000,
    coverPhoto: book5,
    totalLikes: 24000,
    totalChapters: 85,
    status: BookStatus.COMPLETED,
    completed: true,
    matured: false,
    genres: [
      { id: 5, name: "Space Opera", description: "Interstellar adventure." },
    ],
    isAddedToLibrary: true,
    createdAt: "2023-12-01T18:45:00Z",
  },
  {
    id: "b6-444-uf",
    title: "Sunlight & Circuits",
    description:
      "Living in a green-utopia isn't easy when you're the only one who remembers the old, dirty world.",
    author: {
      id: "auth-006",
      username: "eco_warrior",
      firstName: "Lin",
      lastName: "Chen",
      gender: Gender.OTHER,
      avatarUrl: author2,
    },
    averageRating: 4.3,
    totalRating: 210,
    readCount: 3000,
    coverPhoto: book6,
    totalLikes: 800,
    totalChapters: 12,
    status: BookStatus.PUBLISHED,
    completed: false,
    matured: false,
    genres: [
      {
        id: 6,
        name: "Solarpunk",
        description: "Optimistic sustainable future.",
      },
    ],
    isAddedToLibrary: false,
    createdAt: "2026-03-20T11:00:00Z",
  },
  {
    id: "b7-333-tg",
    title: "The Ink of Fate",
    description:
      "Every tattoo he needles onto a client comes true. But he just accidentally drew his own death.",
    author: {
      id: "auth-007",
      username: "ink_master",
      firstName: "Jude",
      lastName: "Thorne",
      gender: Gender.MALE,
      avatarUrl: author0,
    },
    averageRating: 4.6,
    totalRating: 980,
    readCount: 22000,
    coverPhoto: book7,
    totalLikes: 5600,
    totalChapters: 33,
    status: BookStatus.PUBLISHED,
    completed: false,
    matured: true,
    genres: [
      {
        id: 3,
        name: "Magical Realism",
        description: "The supernatural in the mundane.",
      },
      { id: 7, name: "Neo-Noir", description: "Modern noir style." },
    ],
    isAddedToLibrary: true,
    createdAt: "2025-08-10T15:30:00Z",
  },
  {
    id: "b8-222-sh",
    title: "Echoes of the Void",
    description:
      "A horror story about a ship found drifting in deep space with no crew, only recordings of songs that shouldn't exist.",
    author: {
      id: "auth-008",
      username: "void_walker",
      firstName: "Hester",
      lastName: "Pryne",
      gender: Gender.FEMALE,
      avatarUrl: author4,
    },
    averageRating: 4.1,
    totalRating: 400,
    readCount: 5000,
    coverPhoto: book8,
    totalLikes: 1100,
    totalChapters: 8,
    status: BookStatus.DRAFT,
    completed: false,
    matured: true,
    genres: [
      {
        id: 4,
        name: "Victorian Gothic",
        description: "Psychological horror vibes.",
      },
    ],
    isAddedToLibrary: false,
    createdAt: "2026-04-01T22:10:00Z",
  },
];
