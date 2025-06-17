import { BookComment as BookCommentType } from "@/types/Book";
import Icon from "../Icon";
import { HTMLAttributes, memo } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatDateWithTime } from "@/utils/Dates";
import ReactionButton from "../ReactionButton";
import { Reaction } from "@/types/Enums";

interface BookCommentProps extends HTMLAttributes<HTMLDivElement> {
  comment: BookCommentType;
  onReactComment: (url: string, reaction: Reaction) => void;
  onRemoveReactionComment: (url: string) => void;
}

function BookComment({
  comment,
  className,
  onReactComment,
  onRemoveReactionComment,
  ...props
}: BookCommentProps) {
  return (
    <div
      className={`w-full h-fit bg-transparent flex items-start gap-3 ${className}`}
      {...props}
    >
      <Icon size={"lg"} />
      <div className="h-fit w-full text-black">
        <div className="w-full h-fit">
          <h1 className="text-left inline-flex font-semibold text-md">
            {comment?.user.fullName ?? "Anonymous User"}{" "}
            <p className="font-thin ml-2">
              {formatDateWithTime(new Date(comment.createdAt))}
            </p>
          </h1>
          <div className="block w-fit h-fit">
            <div className="items-center flex justify-start">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`size-4 text-yellow-600`}
                  fill={
                    index < (comment?.rating ?? 0) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
          </div>
          <p className="block text-md font-thin h-fit">{comment?.content}</p>
          <div className="h-fit w-fit block">
            <div className="flex justify-start items-center gap-3">
              {/**
               * Still undecided on how what to do on likes and reply
               */}
              <ReactionButton
                onReact={onReactComment}
                onRemove={onRemoveReactionComment}
                comment={comment}
              />
              <Link
                to={"/comments/:commentId/reply"}
                className="text-primary text-md"
              >
                Reply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BookComment);
