import LoadingScreen from "@/pages/LoadingScreen";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface LoadingContextProps {
  loading: boolean;
  showLoadingScreen: () => void;
  hideLoadingScreen: () => void;
}

const LoadingScreenContext = createContext<LoadingContextProps | undefined>(
  undefined
);

interface LoadingScreenProviderProps extends PropsWithChildren {}

function useLoadingScreen() {
  const context = useContext(LoadingScreenContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingScreen must be used within a LoadingScreenProvider"
    );
  }

  return context;
}

function LoadingScreenProvider({ children }: LoadingScreenProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);

  function showLoadingScreen() {
    setLoading(true);
  }

  function hideLoadingScreen() {
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(function () {
      hideLoadingScreen();
    }, 2000);
  }, []);

  const memoizedValue = useMemo(
    () => ({ showLoadingScreen, loading, hideLoadingScreen }),
    [loading]
  );

  return (
    <LoadingScreenContext.Provider value={memoizedValue}>
      {loading ? <LoadingScreen /> : children}
    </LoadingScreenContext.Provider>
  );
}

export { LoadingScreenProvider, useLoadingScreen };
