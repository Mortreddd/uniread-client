import { XMarkIcon } from "@heroicons/react/20/solid";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "../form/Button";

export interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

function Modal({ children }: ModalProps, ref: Ref<ModalRef>) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    setIsOpen(false);
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          setIsOpen(true);
        },
        close() {
          setIsOpen(false);
        },
      };
    },
    []
  );
  return (
    <>
      <div
        ref={modalRef}
        className={`fixed inset-0 flex justify-center z-50 rounded items-center transition-all ${
          isOpen
            ? "bg-black/50 visible duration-200 ease-in-out"
            : "invisible duration-300 ease-in"
        }`}
      >
        <div
          className={`rounded-xl bg-white duration-200 shadow p-6 transition-all ${
            isOpen
              ? "translate-y-0 opacity-100 ease-in"
              : "translate-y-4 opacity-0 ease-out"
          }`}
        >
          <Button
            onClick={handleClose}
            className="absolute top-0 right-0 rounded-lg"
            variant={"transparent"}
          >
            <XMarkIcon className="text-gray-400 size-6 transition-colors duration-200 ease-in-out hover:text-gray-600" />
          </Button>
          {children}
        </div>
      </div>
    </>
  );
}

export default forwardRef(Modal);
