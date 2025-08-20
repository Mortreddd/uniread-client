import { forwardRef, memo, Ref, useState } from "react";
import Modal, { ModalProps, ModalRef } from "./Modal";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../form/Button";

interface WarningConfirmationModalProps extends ModalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

function WarningConfirmationModal(
  { children, onConfirm, onCancel }: WarningConfirmationModalProps,
  ref: Ref<ModalRef>
) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleConfirm() {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal ref={ref}>
      <ExclamationCircleIcon className="mx-auto size-16 bg-transparent text-red-600 my-3" />
      <h2 className="text-2xl font-serif font-semibold text-center mb-4 text-gray-800">
        Caution
      </h2>
      <p className="text-gray-600 font-serif text-lg mb-5 text-center">
        {children}
      </p>
      <div className="flex items-center justify-evenly">
        <Button variant={"light"} onClick={onCancel} className={"rounded"}>
          Cancel
        </Button>
        <Button
          variant={"danger"}
          type={"button"}
          loading={loading}
          onClick={handleConfirm}
          className={"rounded"}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

export default memo(forwardRef(WarningConfirmationModal));
