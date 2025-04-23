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
import { ErrorResponse } from "@/types/Error.ts";

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
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken") || null
  );
  const [user, setUser] = useState<User | null>(null);

  const isAdmin = user !== null && user.isAdmin;
  const isSuperAdmin = user !== null && user.isSuperAdmin;
  const isUser = user !== null && user.isUser;

  async function getUser(): Promise<void> {
    await api
      .get("/users/current")
      .then((response: AxiosResponse<User>) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        if (error.response?.status === 401) {
          tryRefreshToken();
          return;
        }
        console.error(error);
        window.location.href="/"
        setUser(null);
        logout();
      });
  }

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  useEffect(() => {
    if (user && user.username === null) {
      if (window.location.pathname !== "/auth/setup-username") {
        window.location.replace("/auth/setup-username");
      }
    }
  }, [user]);

  async function tryRefreshToken() {
    await api
      .post("/auth/refresh-token", {
        refreshToken,
      })
      .then((response: AxiosResponse<LoginResponse>) => {
        login(response.data);
        console.log(response);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.log(error);
        logout();
      });
  }

  function logout() {
    localStorage.removeItem("iat");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setRefreshToken(null);
    setAccessToken(null);
    delete api.defaults.headers.common["Authorization"];
  }

  function login(response: LoginResponse) {
    console.log(response);
    const { refreshToken, iat, accessToken } = response;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("iat", iat.toString());
    localStorage.setItem("accessToken", accessToken);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    getUser();
    window.location.href="/"
  }

  function isLoggedIn(): boolean {
    return user !== null && accessToken !== null && user !== undefined;
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
