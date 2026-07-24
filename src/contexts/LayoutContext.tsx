import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface LayoutContextProps {
  hasSidebar: boolean;
  setHasSidebar: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextProps | null>(null);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [hasSidebar, setHasSidebar] = useState(false);

  return (
    <LayoutContext.Provider value={{ hasSidebar, setHasSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }

  return context;
}
