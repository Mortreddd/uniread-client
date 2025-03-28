import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./AppRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import GoogleAuthProvider from "./provider/google/GoogleAuthProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AlertProvider>
        <GoogleAuthProvider>
          <NotificationProvider>
            <MessageProvider>
              <RouterProvider router={router} />
            </MessageProvider>
          </NotificationProvider>
        </GoogleAuthProvider>
      </AlertProvider>
    </AuthProvider>
  </React.StrictMode>
);
