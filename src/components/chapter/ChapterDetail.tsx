import { Chapter } from "@/types/Chapter";

interface ChapterDetailProps {
  chapter?: Chapter;
}
export default function ChapterDetail({ chapter }: ChapterDetailProps) {
  // const publishedDate = new Date(chapter.createdAt).toLocaleDateString("Asia/Manila", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // })
  return (
    // <article className="flex justify-between w-full bg-gray-50 px-4 py-2">
    //   <div className="flex text-xl items-center flex-1 truncate">
    //     <h2 className="font-sans font-bold">{chapter.chapterNumber}</h2>
    //     <h2 className="font-sans font-bold ml-4">{chapter.title}</h2>
    //   </div>
    //   <h3 className="text-gray-100 font-semibold text-xl">{publishedDate}</h3>
    // </article>
    <article className="flex justify-between w-full px-4 py-2">
      <div className="flex text-lg text-gray-700 items-center flex-1 truncate">
        <h2 className="font-sans font-semibold ml-4">
          Chapter 1: Hell University
        </h2>
      </div>
      <h3 className="text-gray-600 font-semibold text-md">Wed, Nov 2, 2022</h3>
    </article>
  );
}
