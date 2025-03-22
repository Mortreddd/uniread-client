import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import BookDescriptionPage from "@/pages/BookDescriptionPage";
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
import { BooksPage } from "@/pages/BooksPage.tsx";
import LoadingScreen from "./pages/LoadingScreen";

/**
 *
 *  react-router-dom for createBrowserRouter
 *  https://reactrouter.com/en/main/routers/create-browser-router
 *
 */
export const router = createBrowserRouter([
  {
    path: "/loading",
    element: <LoadingScreen />,
  },
  // Default Page or Landing Page
  {
    path: "/",
    element: <HomePage />,
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
    path: "/messages",
    element: <MessagesPage />,
    children: [
      {
        path: "/messages/conversation/:conversationId",
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
      },
    ],
  },

  // Author Profile Page
  {
    path: "/authors/:username/profile",
    element: <AuthorProfilePage />,
    children: [
      {
        path: "/authors/:username/profile/works",
        element: <AuthorWorks />,
      },
      {
        path: "/authors/:username/profile/about",
        element: <AuthorAbout />,
      },
    ],
  },
  // Static Pages
  // About Page
  {
    path: "/about",
    element: <AboutPage />,
  },
]);
