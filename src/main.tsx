import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./AppRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import GoogleAuthProvider from "./provider/google/GoogleAuthProvider.tsx";
import LoadingProvider from "./contexts/LoadingScreenContext.tsx";
import { ToastProvider } from "@/contexts/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <GoogleAuthProvider>
        <AuthProvider>
          <ToastProvider>
            <NotificationProvider>
              <MessageProvider>
                <RouterProvider router={router}></RouterProvider>
              </MessageProvider>
            </NotificationProvider>
          </ToastProvider>
        </AuthProvider>
      </GoogleAuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
