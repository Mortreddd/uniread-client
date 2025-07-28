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
  accessToken: string | null;
  refreshToken: string | null;
  login: (response: LoginResponse) => void;
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({ children }: AuthProviderProps) {
  const accessToken = localStorage.getItem("accessToken");
  const memoizedAccessToken = useMemo(() => {
    return accessToken;
  }, [accessToken]);

  const refreshToken = localStorage.getItem("refreshToken");
  const memoizedRefreshToken = useMemo(() => {
    return refreshToken;
  }, [refreshToken]);

  const [user, setUser] = useState<User | null>(null);

  const isAdmin = user !== null && user.isAdmin;
  const isSuperAdmin = user !== null && user.isSuperAdmin;
  const isUser = user !== null && user.isUser;

  /**
   * Get the information of current authenticated user using accessToken
   */
  async function getUser(): Promise<void> {
    await api
      .get("/users/me")
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
        window.location.href = "/";
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

  /**
   * Refresh token will be used when the accessToken is expired
   * RefreshToken will be used instead of accessToken to get a new accessToken
   */
  async function tryRefreshToken() {
    await api
      .post("/auth/refresh-token", {
        memoizedRefreshToken,
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

  /**
   * Logout function that clears the local storage,
   * resets the user state, and removes the Authorization header from the API.
   * This function is used to log out the user from the application.
   * It removes the access token, refresh token, and issued at time from local storage,
   */
  function logout() {
    localStorage.removeItem("iat");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/";
  }

  /**
   * Login function handling the response from the server.
   * This function sets the access token and refresh token in local storage,
   * updates the state, and redirects the user to the home page.
   * @param response
   */
  function login(response: LoginResponse) {
    console.log(response);
    const { refreshToken, iat, accessToken } = response;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("iat", iat.toString());
    localStorage.setItem("accessToken", accessToken);
    // setRefreshToken(refreshToken);
    // getUser();
    window.location.reload();
  }

  function isLoggedIn(): boolean {
    return user !== null || accessToken !== null;
  }

  const memoizedContext = useMemo(() => {
    return {
      accessToken: memoizedAccessToken,
      refreshToken: memoizedRefreshToken,
      isAdmin,
      isSuperAdmin,
      isUser,
      user,
      logout,
      login,
      isLoggedIn,
    };
  }, [
    isAdmin,
    isSuperAdmin,
    isUser,
    user,
    login,
    isLoggedIn,
    memoizedRefreshToken,
    memoizedAccessToken,
  ]);

  return (
    <AuthContext.Provider value={memoizedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
