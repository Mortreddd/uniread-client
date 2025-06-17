import { useAuth } from "@/contexts/AuthContext";
import { BookComment } from "@/types/Book";
import { Reaction } from "@/types/Enums";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

interface ReactionButtonProps {
  comment: BookComment;
  onReact: (url: string, reaction: Reaction) => void;
  onRemove: (url: string) => void;
}

export default function ReactionButton({
  comment,
  onRemove,
  onReact,
}: ReactionButtonProps) {
  const { user: currentUser, isLoggedIn } = useAuth();
  const userReaction = useMemo(() => {
    return comment.reactions.find((r) => r.userId === currentUser?.id);
  }, [comment]);
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
    userReaction?.reaction ?? null
  );
  const [visible, setVisible] = useState<boolean>(false);

  const emojies = [
    { emoji: "👍", reaction: Reaction.LIKE },
    { emoji: "❤️", reaction: Reaction.LOVE },
    { emoji: "😂", reaction: Reaction.HAHA },
    { emoji: "😮", reaction: Reaction.WOW },
    { emoji: "😢", reaction: Reaction.SAD },
    { emoji: "😡", reaction: Reaction.ANGRY },
  ];

  const memoizedEmojie = useMemo(() => {
    if (!selectedReaction) return null;

    return emojies.find(({ reaction: r }) => r === selectedReaction)?.emoji;
  }, [selectedReaction]);

  function handleSelectRection(reaction: Reaction) {
    if (reaction !== null && selectedReaction === reaction) {
      setSelectedReaction(null);
      const url = `/books/${comment?.book.id}/comments/${comment.id}/reactions/${userReaction?.id}`;
      onRemove(url);

      if (!isLoggedIn()) {
        setSelectedReaction(null);
      }
    } else {
      setSelectedReaction(reaction);
      const url = `/books/${comment?.book.id}/comments/${comment.id}/reactions/create`;
      onReact(url, reaction);
      if (!isLoggedIn()) {
        setSelectedReaction(null);
      }
    }
    setVisible(false);
  }

  return (
    <div className="relative">
      <p
        className="text-primary text-md hover:text-primary/80 relative cursor-pointer transition-all duration-200 ease-in-out z-10"
        onClick={() => setVisible(true)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {memoizedEmojie ?? "Like"}
      </p>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="absolute inline-flex top-6 inset-x-5 w-fit items-center gap-3 py-2 rounded-full px-5 bg-gray-50 z-50"
          >
            {emojies.map(({ reaction, emoji }, index) => (
              <span
                key={index}
                onClick={() => handleSelectRection(reaction)}
                className={`hover:bg-gray-200 transition-all duration-200 hover:scale-150 ${
                  selectedReaction === reaction
                    ? "bg-gray-200"
                    : "bg-transparent"
                } bg-transparent p-1 rounded-full cursor-pointer text-xl`}
              >
                {emoji}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
