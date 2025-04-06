import { BookComment as BookCommentType } from "@/types/Book";
import Icon from "../Icon";
import BookCommentDetail from "./BookCommentDetail";

interface BookCommentProps {
  comment: BookCommentType;
}

export default function BookComment({ comment }: BookCommentProps) {
  return (
    <div className="w-full h-fit bg-transparent flex items-start gap-3">
      <Icon size={"lg"} />
      <div className="h-fit w-full text-black">
        <BookCommentDetail comment={comment}/>
      </div>
    </div>
  );
}
