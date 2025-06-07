import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.2,
            },
          }}
          exit={{
            opacity: 0,
          }}
          className={"fixed w-full h-screen bg-black/60 inset-0 z-50"}
          onClick={handleClose}
        >
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            className={
              "fixed inset-x-0 top-10 mx-auto w-fit max-w-3xl bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto"
            }
            onClick={(e) => e.stopPropagation()}
          >
            {/* <Button
              onClick={handleClose}
              className="absolute top-2 right-2 rounded-full"
              variant={"transparent"}
            >
              <XMarkIcon className="text-gray-600 rounded-full size-6 transition-all duration-200 ease-in-out hover:text-gray-600" />
            </Button> */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default forwardRef(Modal);
