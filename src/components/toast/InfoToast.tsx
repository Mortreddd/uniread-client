import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Toast from "./Toast";
import { PropsWithChildren } from "react";

interface InfoToastProps extends PropsWithChildren {}

export default function InfoToast({ children }: InfoToastProps) {
  return (
    <Toast variant={"info"} className={"flex"}>
      <InformationCircleIcon className={"size-6 text-white"} />
      <div className="ml-3">
        <p className="text-white font-serif text-wrap font-thin">{children}</p>
      </div>
    </Toast>
  );
}
