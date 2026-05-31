import { Formatters } from "@/utils/formatters";
import IncreasedStats from "../components/IncreasedStats";
import { StarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { BookStatus } from "@/features/books/types/Book";
import { AuthorRecentWorkBookDetails } from "../types/Book";
import AuthorRecentWorkBook from "../components/AuthorRecentWorkBook";

import bookCover1 from "@/assets/books/book1.png";

export default function AuthorDashboardSection() {
  return (
    <div className="size-full overflow-hidden max-w-full">
      <div className="mb-1 md:mb-1.5">
        <h1 className="text-lg md:text-xl lg:text-2xl font-sans font-medium tracking-light text-gray-800 dark:text-gray-200">
          Dashboard
        </h1>
        <p className="text-gray-700 dark:text-gray-300 font-thin font-sans text-extratiny md:text-tiny lg:text-xs">
          Welcome back, here's what's happening with your stories
        </p>
      </div>
      <div className="mb-2 md:mb-3">
        <DashboardStats />
      </div>
      <RecentWorksSection />
    </div>
  );
}

function DashboardStats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative gap-2 md:gap-3">
      <article className="p-2 rounded lg:rounded-lg bg-gray-200 dark:bg-slate-800 lg:p-3 col-span-1 shadow-lg">
        <p className="text-extratiny  md:text-tiny text-black font-sans font-medium tracking-light dark:text-white uppercase text-shadow-xs">
          Total Reads
        </p>
        <h5 className="font-bold text-sky-600 dark:text-sky-400 text-lg md:text-xl lg:text-2xl mb-0.5 md:mb-1">
          {Formatters.Number.formatRelativeNumber(124800)}
        </h5>
        <IncreasedStats text="+5.2% this month" />
      </article>
      <article className="p-2 rounded lg:rounded-lg bg-gray-200 dark:bg-slate-800 lg:p-3 col-span-1 shadow-lg">
        <p className="text-extratiny  md:text-tiny text-black font-sans font-medium tracking-light dark:text-white uppercase text-shadow-xs">
          Avg. Rating
        </p>
        <h5 className="font-bold text-sky-600 dark:text-sky-400 text-lg md:text-xl lg:text-2xl mb-0.5 md:mb-1">
          {4.82}
        </h5>
        <div
          className={`inline-flex items-center text-gray-900 dark:text-gray-100`}
        >
          <StarIcon
            fill={"currentColor"}
            className={`text-inherit size-3 md:size-4 mr-1.5`}
          />
          <span
            className={"text-extratiny md:text-tiny lg:text-sm text-inherit"}
          >
            98th percentile
          </span>
        </div>
      </article>
      <article className="p-2 rounded lg:rounded-lg bg-gray-200 dark:bg-slate-800 lg:p-3 col-span-1 shadow-lg">
        <p className="text-extratiny  md:text-tiny text-black font-sans font-medium tracking-light dark:text-white uppercase text-shadow-xs">
          Total Followers
        </p>
        <h5 className="font-bold text-sky-600 dark:text-sky-400 text-lg md:text-xl lg:text-2xl mb-0.5 md:mb-1">
          {Formatters.Number.formatRelativeNumber(3104)}
        </h5>
        <IncreasedStats text="12 new today" />
      </article>
      <article className="p-2 rounded lg:rounded-lg bg-gray-200 dark:bg-slate-800 lg:p-3 col-span-1 shadow-lg">
        <p className="text-extratiny  md:text-tiny text-black font-sans font-medium tracking-light dark:text-white uppercase text-shadow-xs">
          Active Collaborations
        </p>
        <h5 className="font-bold text-sky-600 dark:text-sky-400 text-lg md:text-xl lg:text-2xl mb-0.5 md:mb-1">
          {Formatters.Number.formatRelativeNumber(124800)}
        </h5>
        <div
          className={`inline-flex items-center text-gray-900 dark:text-gray-100`}
        >
          <UserGroupIcon
            fill={"currentColor"}
            className={`text-inherit size-3 md:size-4 mr-1.5`}
          />
          <span
            className={"text-extratiny md:text-tiny lg:text-sm text-inherit"}
          >
            3 projects pending
          </span>
        </div>
      </article>
    </section>
  );
}

function RecentWorksSection() {
  return (
    <section className="grid grid-cols-12 relative gap-3 md:gap-4">
      <div className="col-span-12 lg:col-span-8 flex justify-between items-center">
        <h1 className="text-lg font-sans font-bold md:text-xl lg:text-2xl text-black dark:text-white tracking-light">
          Recent Works
        </h1>
        <p className="text-tiny md:text-xs lg:text-sm font-sans hover:text-shadow-lg text-sky-600 hover:text-sky-700 transition-all duration-200 ease-in-out">
          View Library
        </p>
      </div>
      <div className="lg:col-span-4"></div>
      <div className="col-span-12 lg:col-span-8">
        {RECENT_WORKS.map((work) => (
          <div className="mb-1" key={work.id}>
            <AuthorRecentWorkBook book={work} />
          </div>
        ))}
      </div>
    </section>
  );
}

export const RECENT_WORKS: AuthorRecentWorkBookDetails[] = [
  {
    id: "bk-8829-vance",
    title: "The Echoes of Neon City",
    description:
      "In a world where memories can be traded like currency, a low-level data courier stumbles upon a high-profile secret that could rewrite the history of the metropolis.",
    averageRating: 4.8,
    readCount: 12540,
    coverPhoto: bookCover1,
    totalLikes: 3205,
    totalChapters: 45,
    status: BookStatus.ONGOING,
    completed: false,
    matured: true,
    genres: [
      {
        id: 7,
        name: "Neo-Noir",
        description: "Cynical heroes and dark alleys.",
      },
    ],
    createdAt: "2024-01-15T08:30:00Z",
    lastModifiedAt: "2024-05-20T14:45:12Z",
  },
];
