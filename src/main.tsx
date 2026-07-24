import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./AppRouter.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import GoogleAuthProvider from "./provider/google/GoogleAuthProvider.tsx";
import { ToastProvider } from "@/contexts/ToastContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { LayoutProvider } from "./contexts/LayoutContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleAuthProvider>
    <ToastProvider>
      <AlertProvider>
        <AuthProvider>
          {/* <NotificationProvider> */}
          {/* <MessageProvider> */}
          <LayoutProvider>
            <SidebarProvider>
              <RouterProvider router={router}></RouterProvider>
            </SidebarProvider>
          </LayoutProvider>
          {/* </MessageProvider> */}
          {/* </NotificationProvider> */}
        </AuthProvider>
      </AlertProvider>
    </ToastProvider>
  </GoogleAuthProvider>,
  // </React.StrictMode>
);
