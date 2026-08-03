import {
  forwardRef,
  HTMLAttributes,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

function Modal({ className, children }: ModalProps, ref: Ref<ModalRef>) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    });
  }, []);

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

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
      },
      close() {
        setIsOpen(false);
      },
    };
  }, []);

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
          className={
            "fixed w-full h-screen max-h-screen flex items-center justify-center bg-black/60 inset-0 z-50 backdrop-blur-xs transition-all duration-200 ease-in-out"
          }
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
            className={`relative mx-auto size-fit md:max-w-xl lg:max-w-3xl bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default forwardRef(Modal);
