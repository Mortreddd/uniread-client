import { AuthProvider } from "./contexts/AuthContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
import { NotificationProvider } from "./contexts/NotificationContext.tsx";
import GoogleAuthProvider from "./provider/google/GoogleAuthProvider.tsx";
import { ToastProvider } from "@/contexts/ToastContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { LayoutProvider } from "./contexts/LayoutContext.tsx";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <GoogleAuthProvider>
      <ToastProvider>
        <AlertProvider>
          <AuthProvider>
            {/* <NotificationProvider> */}
            <MessageProvider>
              <LayoutProvider>
                <SidebarProvider>
                  <Outlet />
                </SidebarProvider>
              </LayoutProvider>
            </MessageProvider>
            {/* </NotificationProvider> */}
          </AuthProvider>
        </AlertProvider>
      </ToastProvider>
    </GoogleAuthProvider>
  );
}
