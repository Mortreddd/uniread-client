import { Formatters } from "@/utils/formatters";
import IncreasedStats from "./IncreasedStats";
import { StarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { BookStatus } from "@/features/books/types/Book";
import { AuthorRecentWorkBookDetails } from "../types/Book";
import AuthorRecentWorkBook from "./AuthorRecentWorkBook";

import bookCover1 from "@/assets/books/book1.png";
import {
  Notification,
  NotificationEntityType,
  NotificationType,
} from "@/shared/components/types/Notification";
import RecentActivityItem from "./RecentActivityItem";

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
      <div className="mb-2 md:mb-3">
        <div className="grid grid-cols-12 relative gap-3 md:gap-4">
          <RecentWorksSection />
          <WritingProgressSection />
          <RecentActivitySection />
        </div>
      </div>
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
    <div className={"col-span-12 lg:col-span-8"}>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-sans font-bold md:text-xl lg:text-2xl text-black dark:text-white tracking-light">
          Recent Works
        </h1>
        <p className="text-tiny md:text-xs lg:text-sm font-sans hover:text-shadow-lg text-sky-600 hover:text-sky-700 transition-all duration-200 ease-in-out">
          View Library
        </p>
      </div>
      <div className="relative space-y-1">
        {RECENT_WORKS.map((work) => (
          <div className="mb-1" key={work.id}>
            <AuthorRecentWorkBook book={work} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WritingProgressSection() {
  return <div className="lg:col-span-4"></div>;
}

function RecentActivitySection() {
  return (
    <section className="col-span-12 lg:col-span-8 space-y-2">
      <h1 className="text-lg font-sans font-bold md:text-xl lg:text-2xl text-black dark:text-white tracking-light">
        Recent Activity
      </h1>
      <div className="relative">
        {RECENT_ACTIVIES.length > 0 ? (
          RECENT_ACTIVIES.map((notif) => (
            <div className="mb-2" key={notif.id}>
              <RecentActivityItem notification={notif} />
            </div>
          ))
        ) : (
          <div className="relative">
            <h2 className="text-tiny text-gray-800 dark:text-gray-200 md:text-xs lg:text-sm font-sans font-semibold">
              No recent activities
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}

const RECENT_WORKS: AuthorRecentWorkBookDetails[] = [
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

const RECENT_ACTIVIES: Notification[] = [
  {
    id: "1",
    recipientId: "user_100",

    actorId: "user_101",
    actorName: "Alice Johnson",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=1",

    entityId: "user_101",
    entityType: NotificationEntityType.USER,
    entityName: "Alice Johnson",

    message: "Alice Johnson followed you",
    isRead: false,

    type: NotificationType.FOLLOW,
    createdAt: "2026-06-13T08:30:00Z",
  },
  {
    id: "2",
    recipientId: "user_100",

    actorId: "user_102",
    actorName: "Mark Rivera",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=2",

    entityId: "book_201",
    entityType: NotificationEntityType.BOOK,
    entityName: "The Lost Kingdom",

    message: "Mark Rivera liked your book 'The Lost Kingdom'",
    isRead: false,

    type: NotificationType.BOOK_LIKED,
    createdAt: "2026-06-13T07:45:00Z",
  },
  {
    id: "3",
    recipientId: "user_100",

    actorId: "user_103",
    actorName: "Jane Cruz",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=3",

    entityId: "chapter_301",
    entityType: NotificationEntityType.CHAPTER,
    entityName: "Chapter 5: The Hidden Path",

    message: "Jane Cruz liked your chapter 'Chapter 5: The Hidden Path'",
    isRead: true,

    type: NotificationType.CHAPTER_LIKED,
    createdAt: "2026-06-12T22:10:00Z",
  },
  {
    id: "4",
    recipientId: "user_100",

    actorId: "user_104",
    actorName: "Carlos Santos",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=4",

    entityId: "comment_401",
    entityType: NotificationEntityType.COMMENT,
    entityName: "“This part gave me chills!”",

    message: "Carlos Santos liked your comment",
    isRead: true,

    type: NotificationType.COMMENT_LIKED,
    createdAt: "2026-06-12T20:15:00Z",
  },
  {
    id: "5",
    recipientId: "user_100",

    actorId: "user_105",
    actorName: "Sophia Lee",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=5",

    entityId: "chapter_302",
    entityType: NotificationEntityType.CHAPTER,
    entityName: "Chapter 6: The Encounter",

    message: "Sophia Lee commented on your chapter 'Chapter 6: The Encounter'",
    isRead: false,

    type: NotificationType.COMMENT_ADDED,
    createdAt: "2026-06-12T18:05:00Z",
  },
  {
    id: "6",
    recipientId: "user_100",

    actorId: "user_106",
    actorName: "Daniel Kim",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=6",

    entityId: "book_202",
    entityType: NotificationEntityType.BOOK,
    entityName: "Shadows of Eternity",

    message: "Daniel Kim published a new book 'Shadows of Eternity'",
    isRead: false,

    type: NotificationType.FOLLOWING_PUBLISHED_BOOK,
    createdAt: "2026-06-12T16:40:00Z",
  },
  {
    id: "7",
    recipientId: "user_100",

    actorId: "user_100",
    actorName: "You",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=7",

    entityId: "user_101",
    entityType: NotificationEntityType.USER,
    entityName: "Alice Johnson",

    message: "You followed Alice Johnson back",
    isRead: true,

    type: NotificationType.FOLLOW_BACK,
    createdAt: "2026-06-11T14:20:00Z",
  },
  {
    id: "8",
    recipientId: "user_100",

    actorId: "user_107",
    actorName: "Liam Garcia",
    actorAvatarUrl: "https://i.pravatar.cc/150?img=8",

    entityId: "book_203",
    entityType: NotificationEntityType.BOOK,
    entityName: "Echoes of the Void",

    message: "Liam Garcia liked your book 'Echoes of the Void'",
    isRead: false,

    type: NotificationType.BOOK_LIKED,
    createdAt: "2026-06-11T12:00:00Z",
  },
];
