import api from "@/services/ApiService";
import { User } from "@/types/User";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextProps {
  logout: () => void;
  isLoggedIn: () => boolean;
  isUser: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // In your logout function
  const logout = async () => {
    try {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      await api.get("/auth/logout");

      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };
  function isLoggedIn() {
    return user !== null;
  }

  const value = useMemo(
    () => ({
      user,
      isAdmin: !!user?.isAdmin,
      isSuperAdmin: !!user?.isSuperAdmin,
      isUser: !!user?.isUser,
      logout,
      isLoggedIn,
    }),
    [user],
  );

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
