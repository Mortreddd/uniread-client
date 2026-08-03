// ChatPreviewDropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChatConversationPreview } from "../types/Chat";
import { cn } from "@/utils/ClassNames";
import { motion, AnimatePresence } from "motion/react";
import { BellIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ChatPreviewDropdownProps {
  anchorRef: React.RefObject<HTMLElement>;
  chat: ChatConversationPreview | null;
  x?: number;
  y?: number;
  onClose: () => void;
}

export default function ChatPreviewDropdown({
  anchorRef,
  x,
  y,
  chat,
  onClose,
}: ChatPreviewDropdownProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const convoOptions = useMemo(
    () => [
      {
        icon: <BellIcon className="size-4" />,
        label: "Mute Conversation",
        action: () => console.log("Mute", chat?.conversationId),
      },
      {
        icon: <TrashIcon className="size-4 text-red-500" />,
        label: "Delete Conversation",
        action: () => console.log("Delete", chat?.conversationId),
      },
    ],
    [chat],
  );

  // Calculate position when dropdown opens
  useEffect(() => {
    let rect;

    if (anchorRef?.current) {
      rect = anchorRef.current.getBoundingClientRect();
    } else if (x !== undefined && y !== undefined) {
      // Use the provided coordinates
      rect = {
        left: x,
        right: x,
        top: y,
        bottom: y,
        width: 0,
        height: 0,
      } as DOMRect;
    } else {
      return;
    }

    const dropdownWidth = 200;
    const dropdownHeight = 100;

    // Start from the bottom-right of the anchor
    let left = rect.right || rect.left;
    let top = rect.bottom || rect.top;

    // Check horizontal space
    const spaceRight = window.innerWidth - (rect.right || rect.left);
    const spaceLeft = rect.left || 0;

    // If not enough space on right, position to the left
    if (spaceRight < dropdownWidth && spaceLeft > dropdownWidth) {
      left = (rect.left || 0) - dropdownWidth;
    } else if (spaceRight < dropdownWidth) {
      // If both sides are tight, position at the right edge
      left = window.innerWidth - dropdownWidth - 10;
    }

    // Check vertical space
    const spaceBelow = window.innerHeight - (rect.bottom || rect.top);
    const spaceAbove = rect.top || 0;

    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      top = (rect.top || 0) - dropdownHeight;
    }

    // Ensure within viewport bounds
    left = Math.max(10, Math.min(left, window.innerWidth - dropdownWidth - 10));
    top = Math.max(10, Math.min(top, window.innerHeight - dropdownHeight - 10));

    setPosition({ top, left });
  }, [anchorRef, x, y]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [onClose, anchorRef]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!chat) return null;

  const baseClassName = cn(
    "flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all",
    "hover:bg-gray-100 dark:hover:bg-slate-600/40",
    "text-gray-700 dark:text-gray-200",
    "hover:text-gray-900 dark:hover:text-white",
    "text-sm cursor-pointer",
  );

  return createPortal(
    <AnimatePresence>
      <motion.ul
        ref={dropdownRef}
        initial={{ opacity: 0, scale: 0.95, y: -5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -5 }}
        transition={{ duration: 0.15 }}
        className="fixed z-50 min-w-40 max-w-60 bg-white dark:bg-slate-700 shadow-lg rounded-lg p-1 border dark:border-slate-600"
        style={{
          top: position.top,
          left: position.left,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {convoOptions.map((item, i) => (
          <li key={i} className="list-none">
            <button
              className={baseClassName}
              onClick={() => {
                item.action();
                onClose();
              }}
            >
              <span className="w-5 flex items-center justify-center">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>,
    document.body,
  );
}
