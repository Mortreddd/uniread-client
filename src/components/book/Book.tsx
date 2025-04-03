import { BookCover, bookCoverVariants } from "./BookCover";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/ClassNames";
import { HTMLAttributes } from "react";
import { Book as BookType } from "@/types/Book";

interface BookProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bookVariant>,
    VariantProps<typeof bookCoverVariants> {
  book?: BookType;
}

const bookVariant = cva("h-fit w-fit flex gap-1 items-start flex-col", {
  variants: {
    variant: {
      custom: "",
    },
  },
  defaultVariants: {
    variant: "custom",
  },
});

export default function Book({ className, size, variant, book }: BookProps) {
  return (
    <>
      <div className={cn(bookVariant({ className, variant }))}>
        <BookCover size={size} className={"mx-auto"} />
        <div className="w-full px-2 py-1">
          <h5 className="text-lg font-sans font-medium w-full truncate line-clamp-1">
            {book?.title ?? "Hell University"}
          </h5>

          <h6 className="text-gray-600 text-md font-sans text-center overflow-hidden text-ellipsis whitespace-nowrap">
            @{book?.user.username}
          </h6>
        </div>
      </div>
    </>
  );
}
