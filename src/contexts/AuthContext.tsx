// AuthProvider.tsx
import api from "@/core/api/ApiService";
import LoadingScreen from "@/shared/components/LoadingScreen.";
import { AuthUser, Role } from "@/types/Auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  logout: () => Promise<void>;
  isLoggedIn: () => boolean;
  isUser: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  user?: AuthUser | null;
  handleProfileUpdate: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery<AuthUser>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const res = await api.get<AuthUser>("/me");
      return res.data;
    },
    retry: (failureCount, error: any) => {
      if (error.response?.status === 401) return false;
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    const handleSessionExpired = () => {
      queryClient.setQueryData(authKeys.me(), null);
      navigate("/");
    };

    window.addEventListener("auth:sessionExpired", handleSessionExpired);
    return () => {
      window.removeEventListener("auth:sessionExpired", handleSessionExpired);
    };
  }, [navigate, queryClient]);

  let isLoggingOut = false;
  const logout = async () => {
    try {
      isLoggingOut = true;

      await api.post("/auth/logout");

      await queryClient.cancelQueries();

      queryClient.setQueryData(["auth", "me"], null);
      queryClient.removeQueries({ queryKey: ["auth", "me"] });

      navigate("/", { replace: true });
    } finally {
      isLoggingOut = false;
    }
  };

  const isLoggedIn = useCallback(() => {
    return !!user;
  }, [user]);

  const handleProfileUpdate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: authKeys.me() });
  }, [queryClient]);

  const roleChecks = useMemo(
    () => ({
      isUser: user?.role === Role.USER,
      isAdmin: user?.role === Role.ADMIN,
      isSuperAdmin: user?.role === Role.SUPER_ADMIN,
    }),
    [user],
  );

  const refetchUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const value = useMemo(
    () => ({
      user,
      ...roleChecks,
      logout,
      isLoggedIn,
      refetchUser,
      handleProfileUpdate,
    }),
    [user, roleChecks, logout, isLoggedIn, refetchUser, handleProfileUpdate],
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
