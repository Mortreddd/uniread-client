import { Fragment } from "react/jsx-runtime";
import { StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {BookComment} from "@/types/Book.ts";

interface BookCommentDetailProps {
  comment?: undefined | BookComment;
}
export default function BookCommentDetail({ comment } : BookCommentDetailProps) {
  const stars: number[] = [1, 2, 3, 4, 5]
  return (
    <Fragment>
      <div className="w-full h-fit">
        <h1 className="text-left block font-semibold text-md">Teythewriter</h1>
        <div className="block w-fit h-fit">
          <div className="items-center flex justify-start">
            {stars.map((star: number) => (
              <StarIcon key={star} className="text-amber-300 size-5" />
            ))}
          </div>
        </div>
        <p className="block text-md font-thin h-fit">
          Hahaha this bitch energy 💀 just like me seeing happy ppl on the
          street
        </p>
        <div className="h-fit w-fit block">
          <div className="flex justify-start items-center gap-3">
            {/**
             * Still undecided on how what to do on likes and reply
             */}
            <Link
              to={"/comments/:commentId/like"}
              className="text-primary text-md"
            >
              Like
            </Link>
            <Link
              to={"/comments/:commentId/reply"}
              className="text-primary text-md"
            >
              Reply
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
