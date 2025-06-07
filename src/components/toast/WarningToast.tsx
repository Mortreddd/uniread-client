import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Toast from "./Toast";
import { PropsWithChildren } from "react";

interface WarningToastProps extends PropsWithChildren {}

export default function WarningToast({ children }: WarningToastProps) {
  return (
    <Toast variant={"warning"} className={"flex"}>
      <ExclamationCircleIcon className={"size-6 text-white"} />
      <div className="ml-3">
        <p className="text-white font-serif text-wrap font-thin">{children}</p>
      </div>
    </Toast>
  );
}
