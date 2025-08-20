import {Chapter} from "@/types/Chapter.ts";
import {motion} from "motion/react";
import {formatShortDateWithTime} from "@/utils/Dates.ts";

interface ChapterSectionListProps {
    chapters: Chapter[];
}

export default function ChapterSectionList({ chapters } : ChapterSectionListProps) {

    return (
        <section className="w-full inline-block space-y-2 overflow-y-auto h-fit">
            {chapters.length !== 0 ? (
                chapters.map((chapter) => (
                    <ChapterItem chapter={chapter} key={chapter.id} />
                ))
            ) : (
                <div className="w-full h-full flex justify-center">
                    <h3 className="text-gray-500 text-lg mt-10 font-sans">
                        No Chapters Found
                    </h3>
                </div>
            )}
        </section>
    )
}

interface ChapterItemProps {
    chapter: Chapter;
}
export function ChapterItem({ chapter } : ChapterItemProps) {
    return (
        <motion.article
            initial={{
                opacity: 0,
                x: -10,
                transition: {
                    ease: "easeInOut",
                    duration: 0.3
                }
            }}

            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    ease: "easeInOut",
                    duration: 0.3
                }
            }}
            key={chapter.id}
            className="w-full min-h-20 max-h-20 h-auto rounded px-4 py-2 isolate hover:bg-gray-200 ease-in-out transition-all duration-200 bg-transparent relative h-fit"
        >
            <a href={`/workspace/stories/${chapter.bookId}/chapters/${chapter.id}`} className="text-nowrap font-serif text-gray-800 rounded-sm truncate font-sans text-lg mb-4">
                {chapter.title}
                <span className={'absolute inset-0 z-10'}></span>
            </a>
            <time className={'text-gray-800 text-sm absolute right-2 bottom-2'}>{`Last Updated: ${formatShortDateWithTime(new Date(chapter.updatedAt))}`}</time>
        </motion.article>
    )
}