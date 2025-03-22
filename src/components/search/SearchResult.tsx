import { Book } from "@/types/Book";
import { HTMLAttributes } from "react";
import bookCoverImage from "@/assets/cover6.jpg";

interface SearchResultProps extends HTMLAttributes<HTMLDivElement> {
  book: Book;
}

export default function SearchResult({
  book,
  className,
  ...props
}: SearchResultProps) {
  const { title } = book;
  return (
    <div
      className={
        "flex px-2 items-center hover:bg-gray-200 ease-in-out duration-200 transition-all"
      }
      {...props}
    >
      <img src={bookCoverImage} className={"h-10 w-7 rounded mr-3"} />
      <div className={"flex-1 flex"}>
        <p className={"text-md font-semibold font-sans"}>{title}</p>
      </div>
    </div>
  );
}
