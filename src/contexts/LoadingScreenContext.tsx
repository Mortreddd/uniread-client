import LoadingScreen from "@/components/LoadingScreen.";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface LoadingContextProps {
  showLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

interface LoadingProviderProps extends PropsWithChildren {}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
}

function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);

  function showLoading(state: boolean) {
    setLoading(state);
  }

  return (
    <LoadingContext.Provider value={{ showLoading }}>
      {loading ? <LoadingScreen /> : children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
