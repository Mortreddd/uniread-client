import DangerAlert from "@/components/common/alert/DangerAlert";
import InfoAlert from "@/components/common/alert/InfoAlert";
import SuccessAlert from "@/components/common/alert/SuccessAlert";
import WarningAlert from "@/components/common/alert/WarningAlert";
import { FC, PropsWithChildren, useEffect, useState } from "react";

import { createContext, useContext } from "react";

export type AlertType = "success" | "error" | "info" | "warning";

export interface Alert {
  message: string;
  type?: AlertType;
}

export interface AlertContextProps {
  showAlert: (message: string, type: AlertType) => void;
}
export const AlertContext = createContext<AlertContextProps>({
  showAlert: () => {},
});

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

interface AlertProviderProps extends PropsWithChildren {}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<Alert[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertMessages((prevItems) => {
        if (prevItems.length > 0) {
          return prevItems.slice(1);
        }
        return prevItems;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contextValue: AlertContextProps = {
    showAlert: (message, type) => {
      const newAlert: Alert = {
        message,
        type,
      };
      setAlertMessages((prev) => [...prev, newAlert]);
    },
  };

  return (
    <AlertContext.Provider value={contextValue}>
      <main className="antialiased isolate bg-transparent w-full">
        {children}
        {alertMessages.map(({ type, message }, index) => (
          <div
            key={index}
            className="fixed right-10 z-50 bottom-10 transition-all w-fit duration-200 translate-x-5 ease-in-out"
          >
            {type === "info" && <InfoAlert>{message}</InfoAlert>}
            {type === "error" && <DangerAlert>{message}</DangerAlert>}
            {type === "success" && <SuccessAlert>{message}</SuccessAlert>}
            {type === "warning" && <WarningAlert>{message}</WarningAlert>}
          </div>
        ))}
      </main>
    </AlertContext.Provider>
  );
};
