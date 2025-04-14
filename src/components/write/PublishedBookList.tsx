import {useUserStories} from "@/components/write/MyStoriesSection.tsx";
import {BookStatus} from "@/types/Enums.ts";
import PublishedBookItem from "@/components/write/PublishedBookItem.tsx";

export default function PublishedBookList() {
    const { books } = useUserStories();

    const publishedBooks = books.filter((book) => {
        return book.status === BookStatus.PUBLISHED
    })

    return (
        <section className={'w-full h-full space-y-2'}>
            {publishedBooks.length > 0 ? (publishedBooks.map((book) => (
                <PublishedBookItem book={book} key={book.id} />
            ))) : (
                <div className={"w-full h-full flex items-center justify-center"}>
                    <h1 className={"text-xl font-sans text-gray-800 font-bold"}>
                        Empty published books
                    </h1>
                </div>
            )}
        </section>
    )
}