import AppLayout from "@/layouts/AppLayout";

import {
  BookAuthor,
  BookCommentPreview,
  BookDetail,
  BookStatus,
} from "../types/Book";
import { Gender } from "@/features/users/types/User";

import author4 from "@/assets/author-4.png";
import sampleBookCover from "@/assets/books/book1.png";
import { Button } from "@/shared/components/form/Button";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { ChapterPreview } from "@/types/Chapter";
import FollowButton from "@/shared/components/buttons/FollowButton";
import BookCover from "../components/BookCover";
import BookDetailSkeleton from "@/features/books/components/BookDetailSkeleton.tsx";
import BookHeader from "../components/BookHeader";
import TableOfContents from "../components/TableOfContents";
import { Reaction } from "@/types/Enums";
import BookCommentSection from "../components/BookCommentSection";

export default function BookDetailsPage() {
  const book = dummyBook;
  const { author } = book;

  if (!book) return <BookDetailSkeleton />;

  return (
    <AppLayout>
      <section className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full gap-3 md:gap-5">
          {/* Book Cover Section */}
          <div className="md:col-span-3 mx-auto">
            <BookCover coverImage={sampleBookCover} />
          </div>

          {/* Book Detail Section */}
          <div className="md:col-span-9 space-y-3 md:space-y-4 lg:space-y-5">
            <BookHeader
              book={book}
              onFollow={() => {}}
              onAddToLibrary={() => {}}
            />
          </div>

          {/* Mobile Collaborator Section */}
          <div className="grid gap-3 md:hidden">
            <CollaboratorsSection author={author} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5">
            <SypnosisSection description={""} />
            <TableOfContents chapters={dummyChapters} />
            <BookCommentSection comments={DUMMY_BOOK_COMMENTS} />
          </div>

          {/* Desktop Collaborator Section */}
          <div className="hidden md:block md:col-span-5 lg:col-span-4">
            <CollaboratorsSection author={author} />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

function SypnosisSection({ description }: { description?: string }) {
  return (
    <div className="relative">
      <h4 className="text-sm md:text-base font-bold font-sans tracking-wide text-black dark:text-white px-1.5 py-1 md:px-2 md:py-1 border-l-2 border-solid border-primary dark:border-primary-dark mb-2 md:mb-3">
        Sypnosis
      </h4>
      <p className="whitespace-pre-line text-tiny md:text-xs text-gray-600 dark:text-gray-400 max-w-none">
        In the rain-slicked streets of Neo-Veridia, information is the only
        currency that matters. When Aria, a high-stakes data courier, intercepts
        an encrypted protocol from the city's ruling elite, she finds herself at
        the center of a conspiracy that threatens to rewrite human
        consciousness. {"\n\n"}
        Collaboratively written by a team of visionary storytellers, "Neon
        Echoes" explores the boundary between artificial intelligence and the
        human soul. This story is an evolving narrative where every choice leads
        to a new ripple in the digital pond.
      </p>
    </div>
  );
}

function CollaboratorsSection({ author }: { author: BookAuthor }) {
  const { id, firstName, lastName, avatarUrl } = author;
  const authorFullName = `${firstName} ${lastName}`;
  return (
    <div className="p-2 relative bg-gray-200 dark:bg-slate-800 rounded space-y-3 md:space-y-4">
      <h6 className="text-black dark:text-white font-sans font-bold text-xs md:text-sm lg:text-lg">
        Collaborators
      </h6>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center">
            <img
              src={avatarUrl}
              className={"size-6 md:size-9 inilne-block rounded-full"}
            />
            <div className="ml-1.5 h-fit">
              <a
                href={`/authors/${id}`}
                className={
                  "text-tiny lg:text-xs font-bold font-sans text-black dark:text-white"
                }
              >
                {authorFullName}
              </a>
              <p className="text-extratiny lg:text-tiny font-sans md:text-tiny text-gray-600 dark:text-gray-300">
                {"Lead Writer"}
              </p>
            </div>
          </div>
          <FollowButton onFollow={() => {}} />
        </div>
      </div>
      <Button
        variant={"transparent"}
        className={"rounded flex justify-center itemsc-center w-full"}
      >
        <UserPlusIcon
          className={"size-3 md:size-4 text-gray-600 dark:text-gray-300"}
        />
        <span className="text-gray-600 dark:text-gray-300 text-tiny md:text-xs font-sans ml-1.5 ">
          Apply to Collaborate
        </span>
      </Button>
    </div>
  );
}

const dummyBook: BookDetail = {
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
  coverPhoto: sampleBookCover,
  totalLikes: 8900,
  totalChapters: 42,
  isFollowingAuthor: false,
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
};

const dummyChapters: ChapterPreview[] = [
  {
    id: "ch-101",
    bookId: "book-001",
    title: "Chapter 1: The Cursed Child",
    averageRating: 4.8,
    totalRating: 1250,
    readCount: 45000,
    totalLikes: 8900,
    likesCount: 120,
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-20T10:15:00Z",
  },
  {
    id: "ch-102",
    bookId: "book-001",
    title: "Chapter 2: Domains and Shadows",
    averageRating: 4.9,
    totalRating: 980,
    readCount: 38000,
    totalLikes: 7200,
    likesCount: 95,
    createdAt: "2024-01-22T09:00:00Z",
    updatedAt: "2024-01-22T09:00:00Z",
  },
  {
    id: "ch-103",
    bookId: "book-001",
    title: "Chapter 3: Unlimited Void",
    averageRating: 5.0,
    totalRating: 2100,
    readCount: 52000,
    totalLikes: 15000,
    likesCount: 340,
    createdAt: "2024-02-01T14:20:00Z",
    updatedAt: "2024-02-05T16:45:00Z",
  },
];

export const DUMMY_BOOK_COMMENTS: BookCommentPreview[] = [
  {
    id: "comm-001",
    bookId: "book-123",
    user: {
      userId: "user-alpha",
      firstName: "Megumi",
      lastName: "Fushiguro",
      username: "megumifushiguro",
      photoUrl: "https://i.pravatar.cc/150?u=megumi",
    },
    parentBookComment: null,
    content:
      "The world-building in this chapter is incredible. I didn't expect the power system to be explained this way!",
    totalReaction: 42,
    authUserReaction: Reaction.LIKE,
    createdAt: "2024-03-10T12:00:00Z",
    updatedAt: "2024-03-10T12:00:00Z",
    replyCount: 1,
    replies: [
      {
        id: "comm-001-reply-1",
        bookId: "book-123",
        user: {
          userId: "user-beta",
          firstName: "Nobara",
          lastName: "Kugisaki",
          username: "kugisakinobara",
          photoUrl: "https://i.pravatar.cc/150?u=nobara",
        },
        parentBookComment: null, // Simplified for preview
        content:
          "Totally agree! But I'm still worried about what happens to the protagonist next.",
        totalReaction: 12,
        authUserReaction: null,
        replies: [],
        replyCount: 0,
        createdAt: "2024-03-10T12:30:00Z",
        updatedAt: "2024-03-10T12:30:00Z",
      },
    ],
  },
  {
    id: "comm-002",
    bookId: "book-123",
    user: {
      userId: "user-gamma",
      firstName: "Yuji",
      lastName: "Itadori",
      username: "yujiitadori",
      photoUrl: "https://i.pravatar.cc/150?u=yuji",
    },
    parentBookComment: null,
    content:
      "Wait, so is Gojo actually back or is this a flashback? I'm so confused but hyped!",
    totalReaction: 156,
    authUserReaction: Reaction.LOVE,
    createdAt: "2024-03-11T09:15:00Z",
    updatedAt: "2024-03-11T09:15:00Z",
    replyCount: 0,
    replies: [],
  },
  {
    id: "comm-003",
    bookId: "book-123",
    user: {
      userId: "user-delta",
      firstName: "Kento",
      lastName: "Nanami",
      username: "kentonanami",
      photoUrl: "https://i.pravatar.cc/150?u=nanami",
    },
    parentBookComment: null,
    content:
      "Writing is a job. And this author is doing their job excellently. 10/10.",
    totalReaction: 89,
    authUserReaction: null,
    createdAt: "2024-03-12T17:45:00Z",
    updatedAt: "2024-03-12T17:45:00Z",
    replyCount: 0,
    replies: [],
  },
];
