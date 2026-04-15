import { useMatch, useNavigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/shared/components/form/Button";
import {
  ArrowLeftIcon,
  Bars3Icon,
  EnvelopeIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import Sidebar, { SidebarRef } from "@/shared/components/Sidebar";
import { ChatConversationPreview } from "@/features/chats/types/Chat";
import ChatPreview from "@/features/chats/ChatPreview";
import author0 from "@/assets/author-0.png";
import author1 from "@/assets/author-1.png";
import author2 from "@/assets/author-2.png";
import author3 from "@/assets/author-3.png";
import author4 from "@/assets/author-4.png";
import { Input } from "@/shared/components/form/Input";
import ActiveChat from "@/features/chats/ActiveChat";

export default function MessagesPages() {
  // const { conversations } = useMessage();
  const hasActiveConversation = useMatch("/conversations/:conversationId");

  const sidebarRef = useRef<SidebarRef>(null);
  const navigate = useNavigate();

  const sidebarOptions = [
    {
      label: "Messages",
      icon: (
        <EnvelopeIcon
          className={"size-4 md:size-5 text-black/80 dark:text-white/80 mr-2"}
        />
      ),
      link: "/chats",
    },
    {
      label: "Archives",
      icon: (
        <FolderOpenIcon
          className={"size-4 md:size-5 text-black/80 dark:text-white/80 mr-2"}
        />
      ),
      link: "/chats/archives",
    },
  ];

  return (
    <AppLayout>
      <section className="flex flex-1 min-h-0 relative dark:bg-slate-800 bg-slate-100">
        {/* Automatic expandable sidebar and responsive */}
        <div className="flex flex-col shrink-0">
          <Sidebar ref={sidebarRef}>
            <div className="p-2 flex flex-col lg:flex-row w-full h-full overflow-y-auto">
              <ul className={"flex flex-row lg:flex-col w-fit"}>
                {sidebarOptions.map(({ label, icon }, key) => (
                  <li key={key}>
                    <Button
                      variant={"transparent"}
                      className={
                        "flex items-center flex-col lg:flex-row justify-start w-full"
                      }
                    >
                      {icon}
                      <span className="lg:hidden text-black text-tiny md:text-xs dark:text-white font-sans inline-block">
                        {label}
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="relative flex flex-col overflow-y-hidden flex-1 min-h-0">
                <h1 className="text-base mt-2 font-sans font-semibold md:text-xl text-black/80 dark:text-white/80">
                  Inbox
                </h1>
                <div className="my-2 shrink-0">
                  <Input
                    id={"search-friends"}
                    type={"search"}
                    variant={"primary"}
                    withSearch={true}
                    className="w-full"
                    placeholder="Search..."
                  />
                </div>
                <div className="flex flex-col h-full w-full overflow-y-auto">
                  {DUMMY_CONVERSATIONS.map((chat, key) => (
                    <div
                      key={key}
                      className="min-w-44 w-full max-w-60 md:max-w-72 lg:max-w-80 shrink-0"
                    >
                      <ChatPreview chat={chat} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
        <div className="flex-1 relative flex flex-col">
          {/* Auto hide button option for mobile */}
          <div className="flex items-center md:hidden bg-transparent">
            <Button variant={"transparent"} onClick={() => navigate(-1)}>
              <ArrowLeftIcon
                className={
                  "text-black dark:text-white text-xs md:text-base size-4"
                }
              />
            </Button>
            <Button
              variant={"transparent"}
              className={"rounded"}
              onClick={() => sidebarRef.current?.open()}
            >
              <Bars3Icon
                className={
                  "text-black dark:text-white text-xs md:text-base size-4"
                }
              />
            </Button>
          </div>
          <div className="flex-1 relative flex flex-col min-w-0">
            <ActiveChat />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export const DUMMY_CONVERSATIONS: ChatConversationPreview[] = [
  {
    conversationId: "conv-001",
    name: "Julian Vance",
    avatar: author0,
    isGroup: false,
    unreadCount: 2,
    hasNewMessage: true,
    isMuted: false,
    isArchived: false,
    lastMessage:
      "The historical accuracy of the Victorian setting looks solid.",
    lastMessageAt: new Date().toISOString(),
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    conversationId: "conv-002",
    name: "Neon Noir Writers",
    avatar: author1,
    isGroup: true,
    unreadCount: 0,
    hasNewMessage: false,
    isMuted: true,
    isArchived: false,
    lastMessage: "Sarah: Just updated the world-building documentation.",
    lastMessageAt: "2024-03-20T14:30:00Z",
    createdAt: "2024-02-01T08:00:00Z",
  },
  {
    conversationId: "conv-003",
    name: "Marcus Thorne",
    avatar: author2,
    isGroup: false,
    unreadCount: 0,
    hasNewMessage: false,
    isMuted: false,
    isArchived: true,
    lastMessage: "I'll get back to you on those character arcs tomorrow.",
    lastMessageAt: "2024-03-18T09:15:00Z",
    createdAt: "2024-01-20T11:20:00Z",
  },
  {
    conversationId: "conv-004",
    name: "The Creative Council",
    avatar: author3,
    isGroup: true,
    unreadCount: 15,
    hasNewMessage: true,
    isMuted: false,
    isArchived: false,
    lastMessage: "Maya: Who is handling the magical realism fact-check?",
    lastMessageAt: "2024-03-22T16:45:00Z",
    createdAt: "2023-12-01T12:00:00Z",
  },
  {
    conversationId: "conv-005",
    name: "Sarah K. Chen",
    avatar: author4,
    isGroup: false,
    unreadCount: 1,
    hasNewMessage: true,
    isMuted: false,
    isArchived: false,
    lastMessage: "Did you see the new cover art for Cyberpunk Solace?",
    lastMessageAt: "2024-03-22T18:00:00Z",
    createdAt: "2024-03-01T15:00:00Z",
  },
];
