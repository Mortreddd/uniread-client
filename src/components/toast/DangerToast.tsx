import { XMarkIcon } from "@heroicons/react/24/outline";
import Toast from "./Toast";
import { PropsWithChildren } from "react";

interface DangerToastProps extends PropsWithChildren {}

export default function DangerToast({ children }: DangerToastProps) {
  return (
    <Toast variant={"danger"} className={"flex"}>
      <XMarkIcon className={"size-6 text-white"} />
      <div className="ml-3">
        <p className="text-white font-serif text-wrap font-thin">{children}</p>
      </div>
    </Toast>
  );
}
