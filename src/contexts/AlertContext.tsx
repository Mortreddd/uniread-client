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
        <div className="fixed right-10 z-30 bottom-10 transition-all w-fit duration-200 translate-x-5 ease-in-out">
          {alertMessages.map(({ type, message }, index) => {
            if (type === "info")
              return <InfoAlert key={index}>{message}</InfoAlert>;
            if (type === "error")
              return <DangerAlert key={index}>{message}</DangerAlert>;
            if (type === "success")
              return <SuccessAlert key={index}>{message}</SuccessAlert>;
            if (type === "warning")
              return <WarningAlert key={index}>{message}</WarningAlert>;
            return null;
          })}
        </div>
      </main>
    </AlertContext.Provider>
  );
};
