import editorChoiceHero from "@/assets/authors/hero-editors-choice.png";
import editoChoiseAuthor from "@/assets/authors/edito-choice-author.png";
import { Button } from "@/shared/components/form/Button";
import { BookOpenIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { BookDetail, BookStatus } from "@/features/books/types/Book";
import book1 from "@/assets/books/book1.png";
import book2 from "@/assets/books/book2.png";
import book3 from "@/assets/books/book3.png";
import book4 from "@/assets/books/book4.png";

import author1 from "@/assets/author-1.png";
import author2 from "@/assets/author-2.png";
import author3 from "@/assets/author-3.png";
import author4 from "@/assets/author-4.png";

import { Gender } from "../types/User";
import BookCard from "@/features/books/components/BookCard";

export default function EditorsChoiceSection() {
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
      className="size-full overflow-hidden max-w-full font-sans text-black dark:text-white"
    >
      <div className="mb-1 space-x-1.5 md:space-x-2">
        <div className="inline-block text-white bg-lime-600 text-nano md:text-extratiny lg:text-tiny rounded-full px-2 py-0.5 font-medium uppercase">
          Curated
        </div>
        <div className="inline-block text-black dark:text-white bg-gray-300 dark:bg-slate-700 rounded-full text-nano md:text-extratiny lg:text-tiny px-2 py-0.5 font-medium uppercase">
          Updated Weekly
        </div>
      </div>
      <h1 className="text-lg md:text-xl lg:text-2xl font-newsreader tracking-light">
        Editor's choice
      </h1>
      <p className="text-tiny md:text-xs lg:text-sm font-sans mb-4 mb:mb-6 lg:mb-8">
        Meet the architects of imagination. These premium storytellers are
        redefining digital literature through depth, nuance, and uncrompromising
        craft.
      </p>

      <HeroEditorChoice />

      <div className="grid grid-cols-12 gap-2 mb-8 md:mb-12">
        <figure className="col-span-4 relative space-y-3">
          <div className="relative overflow-hidden aspect-[3/4] rounded md:rounded-lg">
            <img
              src={editoChoiseAuthor}
              alt="Editor Choice Author"
              className="object-cover size-full object-center"
            />
          </div>
        </figure>

        <div className="col-span-8 relative">
          <figcaption
            className={
              "w-full space-y-2 md:space-y-3 p-3 md:p-4 backdrop-blur-sm rounded"
            }
          >
            <span className="text-blue-500 font-sans font-bold text-xs md:text-sm lg:text-base uppercase tracking-tight">
              Editor's Note
            </span>
            <blockquote className="text-black dark:text-white text-tiny md:text-xs font-newsreader lg:text-lg italic tracking-line-clamp-3 md:line-clamp-5">
              Julian's ability to humanize the cold periphery of near-future
              technology is unmatched. He doesn't just write sci-fi; he wrise
              digital philosopy
            </blockquote>
            <span className="text-gray-800 dark:text-gray-200 font-sans font-semibold text-tiny md:text-xs">
              Avery Pierce, Head Curator
            </span>
          </figcaption>
          <div className="flex gap-2 overflow-x-auto md:gap-4 min-h-32 px-4 md:px-6 mask-x-from-95% no-scrollbar">
            {DUMMY_BOOKS.map((book) => (
              <div
                key={book.id}
                className="shrink-0 max-w-24 md:max-w-36 h-full"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2 mb-8 md:mb-12">
        <div className="col-span-8 relative">
          <figcaption
            className={
              "w-full space-y-2 md:space-y-3 p-3 md:p-4 backdrop-blur-sm rounded"
            }
          >
            <span className="text-blue-500 font-sans font-bold text-xs md:text-sm lg:text-base uppercase tracking-tight">
              Editor's Note
            </span>
            <blockquote className="text-black dark:text-white text-tiny md:text-xs font-newsreader lg:text-lg italic tracking-line-clamp-3 md:line-clamp-5">
              Julian's ability to humanize the cold periphery of near-future
              technology is unmatched. He doesn't just write sci-fi; he wrise
              digital philosopy
            </blockquote>
            <span className="text-gray-800 dark:text-gray-200 font-sans font-semibold text-tiny md:text-xs">
              Avery Pierce, Head Curator
            </span>
          </figcaption>
          <div className="flex gap-2 overflow-x-auto md:gap-4 min-h-32 px-4 md:px-6 mask-x-from-95% no-scrollbar">
            {DUMMY_BOOKS.map((book) => (
              <div
                key={book.id}
                className="shrink-0 max-w-24 md:max-w-36 h-full"
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
        <figure className="col-span-4 relative space-y-3">
          <div className="relative overflow-hidden aspect-[3/4] rounded md:rounded-lg">
            <img
              src={editoChoiseAuthor}
              alt="Editor Choice Author"
              className="object-cover size-full object-center"
            />
          </div>
        </figure>
      </div>
    </motion.div>
  );
}

function HeroEditorChoice() {
  return (
    <div className="mb-6 md:mb-12">
      <div className="relative overflow-hidden">
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
          <img
            src={editorChoiceHero}
            alt="editor's choice author"
            className="size-full object-cover"
          />
          <div className="from-black bg-gradient-to-t to-transparent inset-0 absolute"></div>
        </div>
        <figure
          className="absolute bottom-0 left-0 w-full p-3 md:p-5 mt-4 md:mt-0 h-fit space-y-2 md:space-y-4 bg-transparent backdrop-blur-sm border-l-4 border-primary dark:border-primary-dark rounded-lg 
            md:bottom-6 md:left-auto md:right-6 md:max-w-96 
            lg:bottom-10 lg:right-10 lg:max-w-xl"
        >
          <span className="text-white px-2 py-1 rounded text-tiny md:text-xs font-sans font-medium bg-primary dark:bg-primary-dark">
            Author Spotlight
          </span>
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-newsreader">
            Elena Valerius
          </h2>
          <blockquote
            className={
              "text-tiny md:text-xs lg:text-base font-sans font-thin text-gray-200 tracking-light line-clamp-5 md:lineclamp-3"
            }
          >
            Elena's prose exists in the delicate liminality between magical
            realism and sociological study. Her latest serial, "The Azure Echo."
            has captured over 50k devoted readers
          </blockquote>
          <div className="flex justify-start gap-3 md:gap-5">
            <Button className="text-sm md:text-base text-nowrap rounded-md md:rounded-lg">
              <BookOpenIcon className={"size-4 md:size-5 text-white"} />{" "}
              <span className="text-white text-xs md:text-base">
                Go to Stories
              </span>
            </Button>
            <Button
              variant={"custom"}
              className=" border border-white inline-flex text-sm md:text-base text-nowrap rounded-md md:rounded-lg"
            >
              <UserPlusIcon className={"size-4 md:size-5 text-white"} />
              <span className="text-white text-xs md:text-base">Follow</span>
            </Button>
          </div>
        </figure>
      </div>
    </div>
  );
}

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
    isFollowingAuthor: false,
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
    isFollowingAuthor: false,
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
    isFollowingAuthor: false,
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
    isFollowingAuthor: false,
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
];
