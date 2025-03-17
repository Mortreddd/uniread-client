import api from "@/services/ApiService";
import { LoginResponse } from "@/types/Auth";
import { User } from "@/types/User";
import { AxiosError, AxiosResponse } from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthProviderProps extends PropsWithChildren {}

interface AuthContextProps {
  login: (response: LoginResponse) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isUser: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  accessToken: string | null;
  user?: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState<User | null>(null);

  const isAdmin = user !== null && user.admin;
  const isSuperAdmin = user !== null && user.superAdmin;
  const isUser = user !== null && user.user;

  useEffect(() => {
    if (accessToken === null) return;
    getUser();
  }, [accessToken]);

  async function getUser(): Promise<void> {
    await api
      .get<User>("/users/current")
      .then((response: AxiosResponse<User>) => {
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        setUser(null);
        logout();
      });
  }

  function logout() {
    localStorage.removeItem("exp");
    localStorage.removeItem("iat");
    localStorage.removeItem("accessToken");
    setUser(null);
    setAccessToken(null);
  }

  function login(response: LoginResponse) {
    const { exp, iat, accessToken } = response;
    localStorage.setItem("exp", exp.toString());
    localStorage.setItem("iat", iat.toString());
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
    getUser();
  }

  function isLoggedIn(): boolean {
    return user !== null;
  }

  const memoizedContext = useMemo(() => {
    return {
      accessToken,
      isAdmin,
      isSuperAdmin,
      isUser,
      user,
      logout,
      login,
      isLoggedIn,
    };
  }, [user, accessToken]);

  return (
    <AuthContext.Provider value={memoizedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
