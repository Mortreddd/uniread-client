import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Toast from "./Toast";
import { PropsWithChildren } from "react";

interface SuccessToastProps extends PropsWithChildren {}

export default function SuccessToast({ children }: SuccessToastProps) {
  return (
    <Toast variant={"success"} className={"flex"}>
      <CheckCircleIcon className={"size-6 text-white"} />
      <div className="ml-3">
        <p className="text-white font-serif text-wrap font-thin">{children}</p>
      </div>
    </Toast>
  );
}
