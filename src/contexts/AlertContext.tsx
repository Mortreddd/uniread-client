import DangerAlert from "@/shared/modal/alert/DangerAlert";
import InfoAlert from "@/shared/modal/alert/InfoAlert";
import SuccessAlert from "@/shared/modal/alert/SuccessAlert";
import WarningAlert from "@/shared/modal/alert/WarningAlert";
import { AnimatePresence } from "motion/react";
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
      <div className="antialiased bg-transparent size-full">
        {children}
        <div className="fixed right-10 z-50 bottom-10 transition-all w-fit duration-200 translate-x-5 ease-in-out">
          <AnimatePresence>
            {alertMessages.map(({ type, message }, index) => {
              switch (type) {
                case "info":
                  return <InfoAlert key={index}>{message}</InfoAlert>;
                case "error":
                  return <DangerAlert key={index}>{message}</DangerAlert>;
                case "success":
                  return <SuccessAlert key={index}>{message}</SuccessAlert>;
                case "warning":
                  return <WarningAlert key={index}>{message}</WarningAlert>;
                default:
                  return null;
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </AlertContext.Provider>
  );
};
