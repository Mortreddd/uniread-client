import defaultProfile from "@/assets/profiles/default-profile.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/hooks/useWebsocket";
import { WebSocketEvent } from "@/shared/types/WebSocketEvent";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
type TypingState = {
  userId: string;
  isTyping: boolean;
  avatarPhoto?: string;
} | null;
export default function ShowTyping() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { subscribe } = useWebSocket({});
  const { user } = useAuth();

  const [someoneTyping, setSomeoneTyping] = useState<TypingState>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user || !conversationId) return;

    const sub = subscribe(
      `/topic/chats.${conversationId}.typing`,
      (message) => {
        const event = JSON.parse(message.body) as WebSocketEvent<{
          userId: string;
          avatarPhoto?: string;
          isTyping: boolean;
          timestamp: string;
        }>;

        if (event.type !== "TYPING_STARTED") return;

        const response = event.data;

        if (response.userId === user.id) return;

        if (response.isTyping) {
          setSomeoneTyping({
            avatarPhoto: response.avatarPhoto ?? defaultProfile,
            userId: response.userId,
            isTyping: true,
          });

          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(() => {
            setSomeoneTyping((prev) =>
              prev ? { ...prev, isTyping: false } : null,
            );
          }, 2500);
        } else {
          setSomeoneTyping(null);
        }
      },
    );

    return () => {
      sub?.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [subscribe, user, conversationId]);

  if (!someoneTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -4, y: 4 }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: { ease: "easeInOut", duration: 0.3 },
      }}
      exit={{ opacity: 0, x: -4, y: 4 }}
      className="w-full flex justify-start shrink-0"
    >
      <div className="w-full flex justify-start items-end gap-2">
        <img
          src={someoneTyping.avatarPhoto || defaultProfile}
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover"
        />

        <div className="bg-gray-300 dark:bg-slate-700 rounded-lg rounded-bl-none px-3 py-2 flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-typing"></span>
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-typing delay-150"></span>
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-typing delay-300"></span>
        </div>
      </div>
    </motion.div>
  );
}
