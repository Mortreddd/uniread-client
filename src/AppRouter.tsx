import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import BooksPage from "@/features/books/pages/BooksPage.tsx";
import BookDetailsPage from "./features/books/pages/BookDetailsPage.tsx";
import AuthorsPage from "./features/users/pages/AuthorsPage.tsx";
import AuthorProfilePage from "./features/users/pages/AuthorProfilePage.tsx";
import AuthorDashboardPage from "./features/users/pages/AuthorDashboardPage.tsx";
import AuthorDashboardSection from "./features/users/components/AuthorDashboardSection.tsx";
import SettingsPage from "./features/users/pages/SettingsPage.tsx";
import SettingsProfilePage from "./features/users/pages/SettingsProfilePage.tsx";
import SettingsAccountPage from "./features/users/pages/SettingsAccountPage.tsx";
import ChatsPage from "./features/chats/pages/ChatsPage.tsx";
import NotFoundSection from "./shared/components/NotFoundSection.tsx";
import RegisterPage from "./features/authentication/pages/RegisterPage.tsx";
import VerifyEmailPage from "./features/authentication/pages/VerifyEmailPage.tsx";
import RootLayout from "./RootLayout.tsx";
import ActiveChat from "./features/chats/components/ActiveChat.tsx";

/**
 *
 *  react-router-dom for createBrowserRouter
 *  https://reactrouter.com/en/main/routers/create-browser-router
 *
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // 404 Page
      {
        path: "*",
        element: <NotFoundSection />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/verify-email",
        element: <VerifyEmailPage />,
      },
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
        element: <ChatsPage />,
        children: [
          {
            path: "/chats/:conversationId",
            element: <ActiveChat />,
          },
        ],
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
    ],
  },
]);
