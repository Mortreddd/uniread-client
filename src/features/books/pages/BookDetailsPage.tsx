import AppLayout from "@/layouts/AppLayout";

import { BookAuthor, BookDetail, BookStatus } from "../types/Book";
import { Gender } from "@/features/users/types/User";

import author4 from "@/assets/author-4.png";
import sampleBookCover from "@/assets/books/book1.png";
import { Button } from "@/shared/components/form/Button";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import FollowButton from "@/shared/components/buttons/FollowButton";
import BookCover from "../components/BookCover";
import BookDetailSkeleton from "@/features/books/components/BookDetailSkeleton.tsx";
import BookHeader from "../components/BookHeader";
import TableOfContents from "../components/TableOfContents";
import BookCommentSection from "../components/BookCommentSection";

export default function BookDetailsPage() {
  const book = null;

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
            {/* <CollaboratorsSection author={} /> */}
          </div>

          {/* Main Content */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5">
            <SypnosisSection description={""} />
            <TableOfContents chapters={[]} />
            <BookCommentSection comments={[]} />
          </div>

          {/* Desktop Collaborator Section */}
          <div className="hidden md:block md:col-span-5 lg:col-span-4">
            {/* <CollaboratorsSection author={author} /> */}
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
