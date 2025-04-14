import {Book} from "@/types/Book.ts";
import {BookCover} from "@/components/book/BookCover.tsx";
import defaultBookCover from "@/assets/cover6.jpg";

interface PublishedBookItemProps {
    book: Book;
}

export default function PublishedBookItem({ book, ...rest }: PublishedBookItemProps) {
    const { totalChapterPublishedCount, totalChapterDraftsCount, title } = book
    return (
        <article className={'w-full h-fit flex items-center'} {...rest}>
            <BookCover src={defaultBookCover} size={'sm'}/>
            <div className={"flex-1 ml-3"}>
                <h1 className={"block text-gray-800 font-bold font-sans text-xl"}>
                    {title}
                </h1>
                <p className={"block text-green-500 font-sans font-semibold text-lg"}>
                    {totalChapterPublishedCount} Published Part
                </p>
                <p className={"block text-amber-500 font-sans font-semibold text-lg"}>
                    {totalChapterDraftsCount} Drafts
                </p>
                <strong>
                    <p className={"block text-gray-500 font-thin text-md font-sans"}>
                        Updated 3 hours ago
                    </p>
                </strong>
            </div>

        </article>
    )
}