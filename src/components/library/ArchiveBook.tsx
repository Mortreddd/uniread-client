import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { BookCover } from "../book/BookCover";
import { memo } from "react";
import { Book } from "@/types/Book";

interface ArchiveBookProps {
  book?: Book[];
}
// TODO: remove the @ts-ignore comment before deploying the application
// @ts-ignore
function ArchiveBook({ book }: ArchiveBookProps) {
  return (
    <>
      <div className={"h-fit w-fit flex gap-1 items-start flex-col"}>
        <BookCover size={"md"} />
        <div className="w-full space-x-2 h-full px-2 py-1 flex justify-between items-center">
          <div className="flex-1">
            <h5 className="text-sm font-sans font-medium line-clamp-2 truncate">
              Hell University
            </h5>
            <h6 className="text-gray-600 text-xs font-sans">Teythewriter</h6>
          </div>
          <div className="w-fit">
            <EllipsisVerticalIcon className="hover:bg-gray-400 rounded-full size-3 p-2 md:p-3 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ArchiveBook);
