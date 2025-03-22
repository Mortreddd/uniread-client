import { Book } from "@/types/Book";
import BookDetail from "./BookDetail";

interface SearchBookDetailsProps {
  book: Book;
}

export default function BookSearchedDetails({ book }: SearchBookDetailsProps) {
  return (
    <div className="w-full h-fit">
      <BookDetail book={book} />
      <div className="flex-1">
        <p className="w-full mt-3 text-wrap line-clamp-2 md:line-clamp-4 truncate text-gray-500">
          {book?.description ??
            `After a heartbreaking experience of miscarriage after years of trying
          to get pregnant brings Kathleen to devastation. At a auction Kathleen
          feels a deep connection to one of the painting of little boy crying,
          urging her to buy it right away. At home things start to slowly feel
          normal again but the evil energy attached to the sad painting only
          progresses as her connection deepens.`}
        </p>
      </div>
    </div>
  );
}
