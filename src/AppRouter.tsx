import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import MessagesPage from "@/pages/MessagesPage";
import LibraryPage from "@/pages/LibraryPage";
import BooksPage from "@/features/books/pages/BooksPage.tsx";
import ReadingPage from "./pages/ReadingPage.tsx";
import ViewChapter from "./components/chapter/ViewChapter.tsx";
import BookDetailsPage from "./features/books/pages/BookDetailsPage.tsx";
import AuthorsPage from "./features/users/pages/AuthorsPage.tsx";
import AuthorProfilePage from "./features/users/pages/AuthorProfilePage.tsx";
import AuthorDashboardPage from "./features/users/pages/AuthorDashboardPage.tsx";
import AuthorDashboardSection from "./features/users/components/AuthorDashboardSection.tsx";
import SettingsPage from "./features/users/pages/SettingsPage.tsx";
import SettingsProfilePage from "./features/users/pages/SettingsProfilePage.tsx";
import SettingsAccountPage from "./features/users/pages/SettingsAccountPage.tsx";

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
    path: "/authors/:username",
    element: <AuthorProfilePage />,
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

  {
    path: "/dashboard",
    element: <AuthorDashboardPage />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <AuthorDashboardSection />,
      },
    ],
  },

  {
    path: "/settings",
    element: <SettingsPage />,
    children: [
      {
        path: "/settings",
        element: <SettingsProfilePage />,
        index: true,
      },
      {
        path: "/settings/profile",
        element: <SettingsProfilePage />,
      },
      {
        path: "/settings/account",
        element: <SettingsAccountPage />,
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
