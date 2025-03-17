import { BookCover, bookCoverVariants } from "./BookCover";
import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";
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
        <BookCover size={size} />
        <div className="flex-1 px-2 py-1">
          <h5 className="text-lg font-sans font-medium line-clamp-1 truncate">
            {book?.title ?? "Hell University"}
          </h5>
          <h6 className="text-gray-600 text-md font-sans">Teythewriter</h6>
          <div className="gap-2 flex items-center">
            <Bars3BottomLeftIcon className={"size-4"} />
            <p className="text-gray-400 font-sans text-sm">53 chapters</p>
          </div>
        </div>
      </div>
    </>
  );
}
