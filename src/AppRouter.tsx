import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProfilePage from "@/pages/ProfilePage";
import WorksSection from "@/components/profile/WorksSection";
import AboutSection from "@/components/profile/AboutSection";
import MessagesPage from "@/pages/MessagesPage";
import LibraryPage from "@/pages/LibraryPage";
import AuthorProfilePage from "@/pages/AuthorProfilePage";
import AuthorWorks from "@/features/users/AuthorWorks.tsx";
import AuthorAbout from "@/features/users/AuthorAbout.tsx";
import BooksPage from "@/pages/books/BooksPage.tsx";
import AuthorPage from "./pages/AuthorPage";
import SetupUsernamePage from "./pages/auth/SetupUsernamePage";
import WriteChapterPage from "@/pages/books/WriteChapterPage.tsx";
import EditChapter from "./components/chapter/partial/EditChapter.tsx";
import WorkspacePage from "./pages/workspace/WorkspacePage.tsx";
import UserDashboard from "./pages/workspace/UserDashboard.tsx";
import Stories from "./pages/workspace/Stories.tsx";
import ReadingPage from "./pages/ReadingPage.tsx";
import ViewChapter from "./components/chapter/ViewChapter.tsx";
import BasePage from "./pages/settings/BasePage.tsx";
import ProfileSettings from "./pages/settings/ProfileSettings.tsx";
import ConversationMessages from "./components/messages/ConversationMessages.tsx";
import NewConversationMessages from "./components/messages/NewConversationMessages.tsx";
import BookDetailPage from "./pages/BookDetailPage.tsx";

/**
 *
 *  react-router-dom for createBrowserRouter
 *  https://reactrouter.com/en/main/routers/create-browser-router
 *
 */
export const router = createBrowserRouter([
  // Default Page or Landing Page
  {
    path: "/",
    element: <HomePage />,
  },
  // Setting up username
  {
    path: "/authentication/setup-username",
    element: <SetupUsernamePage />,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
  // Book Info Page
  {
    path: "/books/:bookId",
    element: <BookDetailPage />,
  },
  {
    path: "/books/:bookId/chapters",
    children: [
      {
        index: true,
        path: "/books/:bookId/chapters",
        element: <ReadingPage />,
      },
      {
        path: "/books/:bookId/chapters/:chapterId",
        element: <ViewChapter />,
      },
    ],
  },
  // Author Page
  {
    path: "/authors",
    element: <AuthorPage />,
  },
  {
    path: "/chats",
    element: <MessagesPage />,
    children: [
      {
        path: "/chats/:conversationId",
        // element: <ConversationMessages />,
        element: <h1>Hello</h1>,
      },
    ],
  },
  // Library Page
  {
    path: "/library",
    element: <LibraryPage />,
  },

  // Workspace Page
  {
    path: "/workspace",
    element: <WorkspacePage />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "stories",
        element: <Stories />,
      },
    ],
  },
  {
    path: "/workspace/stories/:bookId",
    element: <WriteChapterPage />,
    children: [
      {
        path: "chapters/:chapterId",
        element: <EditChapter />,
      },
    ],
  },

  // Profile Page
  {
    path: "/profile",
    element: <ProfilePage />,
    children: [
      {
        path: "/profile/works",
        element: <WorksSection />,
      },
      {
        path: "/profile/about",
        element: <AboutSection />,
        index: true,
      },
    ],
  },

  {
    path: "/settings",
    element: <BasePage />,
    children: [
      {
        path: "/settings",
        element: <ProfileSettings />,
        index: true,
      },
      {
        path: "/settings/profile",
        element: <ProfileSettings />,
      },
    ],
  },

  // Author Profile Page
  {
    path: "/authors/:authorId/profile",
    element: <AuthorProfilePage />,
    children: [
      {
        path: "/authors/:authorId/profile/works",
        element: <AuthorWorks />,
      },
      {
        path: "/authors/:authorId/profile/about",
        element: <AuthorAbout />,
        index: true,
      },
    ],
  },
  // Static Pages
  // About Page
  {
    path: "/about",
    element: <AboutPage />,
  },

  {
    path: "/test",
    element: <HomePage />,
  },
]);
