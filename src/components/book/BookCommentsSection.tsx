import useGetBookComments from "@/api/comments/useGetBookComments";
import { BookComment as BookCommentType } from "@/types/Book";
import { PaginateParams } from "@/types/Pagination";
import { useEffect, useState } from "react";
import LoadingCircle from "../LoadingCirlce";
import BookComment from "../comment/BookComment";

/**
 * * BookCommentsSection component for displaying comments on a book
 * @param {string} bookId - The ID of the book to get the comments of the selected book
 */

interface BookCommentsSectionProps {
  bookId: string | undefined;
}
export default function BookCommentsSection({
  bookId,
}: BookCommentsSectionProps) {
  const [{ pageNo, pageSize }] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const { data, loading } = useGetBookComments({
    bookId,
    pageSize,
    pageNo,
  });

  const [comments, setComments] = useState<BookCommentType[]>([]);

  useEffect(() => {
    if (data) {
      setComments(data.content || []);
    }
  }, [data]);

  return (
    <section className="flex flex-col items-start space-y-4 p-4 bg-gray-100 rounded-lg overflow-y-hidden min-h-full h-fit">
      {loading && !data?.content ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingCircle size={"lg"} />
        </div>
      ) : comments.length > 0 ? (
        comments.map((comment) => <BookComment comment={comment} />)
      ) : (
        !loading && (
          <div className="w-full h-full flex items-center justify-center">
            <p>No comments yet</p>
          </div>
        )
      )}
    </section>
  );
}
