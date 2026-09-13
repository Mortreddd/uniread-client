import { AuthProvider } from "./contexts/AuthContext.tsx";
import GoogleAuthProvider from "./provider/google/GoogleAuthProvider.tsx";
import { ToastProvider } from "@/contexts/ToastContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";
import { LayoutProvider } from "./contexts/LayoutContext.tsx";
import App from "./App.tsx";

export default function RootLayout() {
  return (
    <GoogleAuthProvider>
      <ToastProvider>
        <AlertProvider>
          <AuthProvider>
            <LayoutProvider>
              <SidebarProvider>
                <App />
              </SidebarProvider>
            </LayoutProvider>
          </AuthProvider>
        </AlertProvider>
      </ToastProvider>
    </GoogleAuthProvider>
  );
}
