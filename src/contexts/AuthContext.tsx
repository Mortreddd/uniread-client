import api from "@/core/api/ApiService.ts";
import LoadingScreen from "@/pages/LoadingScreen";
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

  // useEffect(() => {
  //   api
  //     .get("/users/me")
  //     .then((res) => setUser(res.data))
  //     .catch(() => setUser(null))
  //     .finally(() => setLoading(false));
  // }, []);

  // In your logout function
  const logout = async () => {
    try {
      setUser(null);

      await api.get("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/";
    }
  };

  function isLoggedIn() {
    // return user !== null;
    return true;
  }

  const value = useMemo(
    () => ({
      user,
      isAdmin: true, // TODO: Implement actual role-based logic
      isSuperAdmin: true, // TODO: Implement actual role-based logic
      isUser: true, // TODO: Implement actual role-based logic
      logout,
      isLoggedIn,
    }),
    [user],
  );

  // if (loading) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
