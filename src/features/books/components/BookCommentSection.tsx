import LikeButton from "@/shared/components/buttons/LikeButton";
import { BookCommentPreview } from "../types/Book";
import gojoProfile from "@/assets/profiles/gojo.jpg";
import ReplyButton from "@/shared/components/buttons/ReplyButton";
import { Button } from "@/shared/components/form/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function BookCommentSection({
  comments,
}: {
  comments: BookCommentPreview[];
}) {
  return (
    <div className="mt-3 md:mt-4 relative space-y-3 md:space-y-4">
      {comments.map((comment, key) => (
        <BookComment comment={comment} key={key} />
      ))}
    </div>
  );
}

function BookComment({ comment }: { comment: BookCommentPreview }) {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div className="flex gap-2">
      <img
        src={comment.user.photoUrl ?? gojoProfile}
        className={"size-7 min-w-0 shrink-0 inilne-block rounded-full"}
      />
      <div className="flex flex-1 flex-col space-y-1.5 md:space-y-2">
        <h6 className="font-sans font-bold text-tiny md:text-xs text-black dark:text-white">
          {`${comment.user.firstName} ${comment.user.lastName}`}
        </h6>
        <p className="text-tiny md:text-xs font-sans text-gray-600 dark:text-gray-400 text-wrap">
          {comment.content}
        </p>
        <div className="inline-flex gap-2 md:gap-3 items-center">
          <LikeButton showText={true} />
          <ReplyButton showText={true} />
          {comment.replyCount > 0 && (
            <span className="text-extratiny md:text-tiny text-gray-600 dark:text-gray-300 font-sans">
              {comment.replyCount + " replies"}
            </span>
          )}
          <Button
            variant={"transparent"}
            className="text-extratiny md:text-tiny"
          >
            {comment.replyCount > 0 && (
              <Button
                size={"custom"}
                variant={"transparent"}
                className="text-extratiny md:text-tiny font-bold text-primary"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? "Hide replies" : "Show replies"}
              </Button>
            )}
          </Button>
        </div>
        <AnimatePresence mode={"wait"}>
          {showReplies && comment.replies && comment.replies.length > 0 && (
            <motion.div
              key={"comment-replies"}
              initial={{
                opacity: 0,
                translateY: -10,
              }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                translateY: -10,
              }}
              className="mt-2 space-y-3 md:space-y-4 border-l-2 border-primary dark:border-primary-dark ml-2 pl-4"
            >
              {/* ml-2: Moves the start of the border slightly away from the avatar line.
                  pl-4: This is what creates the "Indentation".
                  border-l-2: Creates that nice visual vertical line.
                  */}
              {comment.replies.map((reply) => (
                <BookCommentReply reply={reply} key={reply.id} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BookCommentReply({ reply }: { reply: BookCommentPreview }) {
  return (
    <div className="flex gap-2">
      <img
        src={reply.user.photoUrl ?? gojoProfile}
        className={"size-7 min-w-0 shrink-0 inilne-block rounded-full"}
      />
      <div className="flex flex-1 flex-col space-y-1.5 md:space-y-2">
        <h6 className="font-sans font-bold text-tiny md:text-xs text-black dark:text-white">
          {`${reply.user.firstName} ${reply.user.lastName}`}
        </h6>
        <p className="text-tiny md:text-xs font-sans text-gray-600 dark:text-gray-400 text-wrap">
          {reply.content}
        </p>
        <div className="inline-flex gap-2 md:gap-3 items-center">
          <LikeButton showText={true} />
          <ReplyButton showText={true} />
        </div>
      </div>
    </div>
  );
}
