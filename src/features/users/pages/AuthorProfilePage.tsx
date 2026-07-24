import AppLayout from "@/layouts/AppLayout";
import FollowButton from "@/shared/components/buttons/FollowButton";

import gojoProfile from "@/assets/profiles/gojo.jpg";
import profileBackground from "@/assets/backgrounds/Profile.webp";
import { Formatters } from "@/utils/formatters";
import UnfollowButton from "@/shared/components/buttons/UnfollowButton";
import {
  AtSymbolIcon,
  CalendarIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  MapPinIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import Tab from "@/shared/components/Tab";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Gender } from "../types/User";

import author2 from "@/assets/author-2.png";
import author3 from "@/assets/author-3.png";
import author4 from "@/assets/author-4.png";

import book1 from "@/assets/books/book1.png";
import book2 from "@/assets/books/book2.png";
import book3 from "@/assets/books/book3.png";
import { BookStatus } from "@/features/books/types/Book";
import { Button } from "@/shared/components/form/Button";
import AuthorCreationBook from "@/features/books/components/AuthorCreationBook";
import AuthorCollaborationBook from "@/features/books/components/AuthorCollaborationBook";
import { ModalRef } from "@/shared/components/Modal";
import AuthorFollowersModal from "../components/modals/AuthorFollowersModal";
import AuthorFollowingsModal from "../components/modals/AuthorFollowingsModal";

export default function AuthorProfilePage() {
  return (
    <AppLayout>
      <div className="flex flex-1 flex-col relative py-4 md:py-6">
        <div className="relative w-full max-w-7xl px-4 md:px-6 mx-auto grid grid-cols-12 gap-2 md:gap-4">
          <section className="col-span-12">
            <AuthorProfileSection />
          </section>
          <section className="col-span-4">
            <AuthorAboutSection />
          </section>
          <div className="col-span-8">
            <AuthorCreationsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function AuthorProfileSection() {
  const isFollowingAuthor = false;
  const followerModalRef = useRef<ModalRef>(null);
  const followingModalRef = useRef<ModalRef>(null);
  return (
    <div className="relative rounded md:rounded-lg overflow-hidden">
      <AuthorFollowersModal ref={followerModalRef} />
      <AuthorFollowingsModal ref={followingModalRef} />
      <div className="relative bg-gray-200 dark:bg-slate-800 ">
        <div className="w-full overflow-hidden h-32 md:h-52 lg:h-60 mask-b-from-black mask-b-from-90% mask-b-to-transparent">
          <img
            src={profileBackground}
            alt="profile-background"
            className="size-full object-center object-cover"
          />
        </div>
        <div className="flex justify-between items-end px-4 py-2 md:px-6 md:py-3.5 md:p-6 lg:px-8 -mt-8 md:-mt-16">
          <div className="flex-1 flex min-w-0 items-end">
            <img
              src={gojoProfile}
              alt="gojo-satoru"
              className="z-10 object-cover object-center size-16 md:size-24 lg:size-28 rounded md:rounded-lg border border-primary dark:border-primary-dark"
            />
            <div className="relative space-y-1 md:space-2 ml-2">
              <h6 className="text-xs md:text-base lg:text-lg text-gray-800 dark:text-gray-200 font-sans font-semibold truncate tracking-wide line-clamp-1">
                Emmanuel Male
              </h6>
              <p className="text-extratiny md:text-xs lg:text-base font-thin text-gray-700 dark:text-gray-100 font-sans">
                @emmanuelmale
              </p>
            </div>
          </div>
          <div className="inline-flex shrink-0 items-center">
            {isFollowingAuthor ? (
              <FollowButton onFollow={() => {}} />
            ) : (
              <UnfollowButton onUnfollow={() => {}} />
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center py-1 md:py-2 bg-gray-300 dark:bg-slate-700">
        <div className="flex-1 flex justify-center">
          <Button variant={"transparent"} className={"space-y-1"}>
            <h6 className="text-sky-300 font-sans text-xs md:text-lg">
              {Formatters.Number.formatRelativeNumber(12)}
            </h6>
            <p className="text-gray-800 dark:text-gray-200 font-sans uppercase text-tiny md:text-xs">
              Stories
            </p>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Button
            className="space-y-1"
            variant={"transparent"}
            onClick={() => {
              followerModalRef.current?.open();
            }}
          >
            <h6 className="text-sky-300 font-sans text-xs md:text-lg">
              {Formatters.Number.formatRelativeNumber(8421)}
            </h6>
            <p className="text-gray-800 dark:text-gray-200 font-sans uppercase text-tiny md:text-xs">
              Followers
            </p>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Button
            className={"space-y-1"}
            variant={"transparent"}
            onClick={() => {
              followingModalRef.current?.open();
            }}
          >
            <h6 className="text-sky-300 font-sans text-xs md:text-lg">
              {Formatters.Number.formatRelativeNumber(243)}
            </h6>
            <p className="text-gray-800 dark:text-gray-200 font-sans uppercase text-tiny md:text-xs">
              Followings
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

function AuthorAboutSection() {
  return (
    <div className="space-y-4 md:space-y-5">
      <article className="relative p-2 md:p-3 lg:p-5 space-y-3 md:space-y-4 bg-gray-200 dark:bg-slate-800">
        <h5 className="text-extratiny md:text-lg text-black dark:text-white font-sans font-bold">
          About the Author
        </h5>
        <p className="text-gray-600 dark:text-gray-300 text-extratiny md:text-tiny lg:text-base italic">
          "I write stories that lingers in the space between reality and dreams.
          Observed with character psychology, rain-slicked streets, and the
          perfect cup of Earn Grey."
        </p>
        <ul className="space-y-2 md:space-y-3 font-thin text-extratiny md:text-tiny lg:text-base">
          <li className="space-x-2 md:space-x-3 text-gray-700 dark:text-gray-300 ">
            <MapPinIcon
              className={"inline-block text-inherit size-3 md:size-4"}
            />
            <span className="inline-block text-inherit">Seattle, WA</span>
          </li>
          <li className="space-x-2 md:space-x-3 text-gray-700 dark:text-gray-300 ">
            <CalendarIcon
              className={"inline-block text-inherit size-3 md:size-4"}
            />
            <span className="inline-block text-inherit">Joined March 2021</span>
          </li>
          <li className="space-x-2 md:space-x-3 text-gray-700 dark:text-gray-300 ">
            <CheckBadgeIcon
              className={"inline-block text-inherit size-3 md:size-4"}
            />
            <span className="inline-block text-inherit">Verified Author</span>
          </li>
        </ul>
      </article>
      <div className="p-2 md:p-3 bg-gray-200 dark:bg-slate-800 space-y-1.5 md:space-y-3">
        <h6 className="text-black dark:text-white font-medium font-sans text-extratiny md:text-lg">
          Connect
        </h6>
        <div className="space-x-0.5 md:space-x-2">
          <Button size={"sm"} className={"rounded inline-block "}>
            <GlobeAltIcon className={"text-white size-2 md:size-3"} />
          </Button>
          <Button size={"sm"} className={"rounded inline-block "}>
            <AtSymbolIcon className={"text-white size-2 md:size-3"} />
          </Button>
          <Button size={"sm"} className={"rounded inline-block "}>
            <WifiIcon className={"text-white size-2 md:size-3"} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function AuthorCreationsSection() {
  const [activeTab, setActiveTab] = useState<"works" | "collaborations">(
    "works",
  );
  return (
    <article className="bg-transparent relative overflow-hidden">
      <AnimatePresence mode="wait">
        <div className="flex items-center overflow-x-auto no-scrollbar text-extratiny md:text-xs lg:text-sm">
          <Tab
            onClick={() => setActiveTab("works")}
            isActive={activeTab === "works"}
            className={"text-nowrap min-w-fit"}
          >
            Published Works
          </Tab>
          <Tab
            onClick={() => setActiveTab("collaborations")}
            isActive={activeTab === "collaborations"}
            className={"text-nowrap min-w-fit"}
          >
            Collaborations
          </Tab>
        </div>
        <Tab.Content className={"bg-transparent p-2 md:p-3"}>
          <AnimatePresence>
            {activeTab === "collaborations" ? (
              <CollaborationBookList authorId="" />
            ) : (
              <AuthorCreationBookList authorId="" />
            )}
          </AnimatePresence>
          <div className="col-span-1 md:col-span-2 place-items-center">
            {authorBooks.length > 0 && (
              <Button
                variant={"transparent"}
                className={"text-extratiny md:text-xs"}
              >
                Load More Projects
              </Button>
            )}
          </div>
        </Tab.Content>
      </AnimatePresence>
    </article>
  );
}

function AuthorCreationBookList({ authorId }: { authorId: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
      {authorBooks.map((book) => (
        <AuthorCreationBook book={book} key={book.id} />
      ))}
    </div>
  );
}

function CollaborationBookList({ authorId }: { authorId: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
      {authorBooks.map((book) => (
        <AuthorCollaborationBook book={book} key={book.id} />
      ))}
    </div>
  );
}

const authorBooks = [
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
];
