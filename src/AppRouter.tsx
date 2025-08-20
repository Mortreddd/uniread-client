import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import BookDescriptionPage from "@/pages/books/BookDescriptionPage.tsx";
import ProfilePage from "@/pages/ProfilePage";
import WorksSection from "@/components/profile/WorksSection";
import AboutSection from "@/components/profile/AboutSection";
import MessagesPage from "@/pages/MessagesPage";
import Conversation from "@/components/messages/Conversation";
import GenresPage from "@/pages/GenresPage";
import GenreBooksPage from "@/pages/GenreBooksPage";
import LibraryPage from "@/pages/LibraryPage";
import Archive from "@/components/library/Archive";
import SearchPage from "@/pages/SearchPage";
import SearchAll from "@/components/search/SearchAll";
import SearchBook from "@/components/search/SearchBook";
import SearchAuthor from "@/components/search/SearchAuthor";
import AuthorProfilePage from "@/pages/AuthorProfilePage";
import AuthorWorks from "@/components/author/AuthorWorks";
import AuthorAbout from "@/components/author/AuthorAbout";
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
import UserRegisterationPage from "./pages/auth/UserRegisterationPage.tsx";

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
    path: "/register",
    element: <UserRegisterationPage />,
  },
  // Setting up username
  {
    path: "/auth/setup-username",
    element: <SetupUsernamePage />,
  },
  // Genres Page
  {
    path: "/genres",
    element: <GenresPage />,
  },
  // Genre Books Page
  {
    path: "/genres/:genreId/books",
    element: <GenreBooksPage />,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
  // Book Info Page
  {
    path: "/books/:bookId",
    element: <BookDescriptionPage />,
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
    path: "/search",
    element: <SearchPage />,
    children: [
      {
        path: "/search/all",
        element: <SearchAll />,
      },

      {
        path: "/search/books",
        element: <SearchBook />,
      },
      {
        path: "/search/authors",
        element: <SearchAuthor />,
      },
    ],
  },

  // Requires Authentication
  // Message or Inbox Page
  {
    path: "/conversations",
    element: <MessagesPage />,
    children: [
      {
        path: "/conversations/:conversationId/messages",
        element: <Conversation />,
      },
    ],
  },
  // Library Page
  {
    path: "/library",
    element: <LibraryPage />,
    children: [
      {
        path: "/library/saved",
        element: <Archive />,
      },
      {
        path: "/library/bookmarks",
        element: <div>Bookmarks</div>,
      },
    ],
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
