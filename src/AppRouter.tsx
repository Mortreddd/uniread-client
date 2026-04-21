import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import MessagesPage from "@/pages/MessagesPage";
import LibraryPage from "@/pages/LibraryPage";
import BooksPage from "@/features/books/pages/BooksPage.tsx";
import SetupUsernamePage from "./pages/auth/SetupUsernamePage";
import WriteChapterPage from "@/pages/books/WriteChapterPage.tsx";
import EditChapter from "./components/chapter/partial/EditChapter.tsx";
import WorkspacePage from "./pages/workspace/WorkspacePage.tsx";
import UserDashboard from "./pages/workspace/UserDashboard.tsx";
import ReadingPage from "./pages/ReadingPage.tsx";
import ViewChapter from "./components/chapter/ViewChapter.tsx";
import BasePage from "./pages/settings/BasePage.tsx";
import ProfileSettings from "./pages/settings/ProfileSettings.tsx";
import BookDetailsPage from "./features/books/pages/BookDetailsPage.tsx";
import AuthorsPage from "./features/users/pages/AuthorsPage.tsx";

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
    element: <BookDetailsPage />,
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
    element: <AuthorsPage />,
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
