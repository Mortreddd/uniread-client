import DangerToast from "@/components/toast/DangerToast";
import InfoToast from "@/components/toast/InfoToast";
import SuccessToast from "@/components/toast/SuccessToast";
import WarningToast from "@/components/toast/WarningToast";
import { AnimatePresence } from "motion/react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps extends PropsWithChildren {}

export function ToastProvider({ children }: ToastProviderProps) {
  // array of messages to be shown
  const [toasts, setToasts] = useState<{ message: string; type: ToastType }[]>(
    []
  );

  useEffect(() => {
    const seconds = 4000; // 4 seconds
    const interval = setInterval(() => {
      setToasts((prev) => {
        if (prev.length === 0) return prev;

        return prev.splice(1);
      });
    }, seconds);

    return () => clearInterval(interval);
  }, [toasts]);

  function showToast(message: string, type: ToastType = "info") {
    setToasts((prev) => {
      return [{ message, type }, ...prev];
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="h-screen w-screen top-0 left-0 absolute">
        {children}
        <div className="bottom-10 right-10 absolute z-30 pointer-events-auto space-x-5 w-fit">
          <AnimatePresence>
            {toasts.map(({ message, type }, index) => {
              if (type === "error") {
                return <DangerToast key={index}>{message}</DangerToast>;
              }
              if (type === "info") {
                return <InfoToast key={index}>{message}</InfoToast>;
              }
              if (type === "success") {
                return <SuccessToast key={index}>{message}</SuccessToast>;
              }
              if (type === "warning") {
                return <WarningToast key={index}>{message}</WarningToast>;
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
