import Modal, { ModalRef } from "@/shared/components/Modal";
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import { Button } from "@/shared/components/form/Button";

interface CreateBookConfirmationModalProps {
  onConfirm: () => Promise<void>;
}

function CreateBookConfirmationModal(
  { onConfirm }: CreateBookConfirmationModalProps,
  ref: Ref<ModalRef>,
) {
  const modalRef = useRef<ModalRef>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    setSubmitting(true);
    try {
      await onConfirm();
    } finally {
      setSubmitting(false);
    }
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.open();
    },
    close: () => modalRef.current?.close(),
  }));

  return (
    <Modal ref={modalRef}>
      <div className="rounded-xs p-3 space-y-3 bg-white max-w-96 min-w-72 md:min-w-96 dark:bg-slate-900">
        <h1 className="text-gray-800 dark:text-gray-200 font-newsreader text-xl md:text-2xl lg:text-3xl text-center font-medium">
          Required Confirmation
        </h1>

        <p className="text-center text-xs md:text-sm font-sans font-thin text-gray-700 dark:text-gray-300">
          By proceeding, you confirm that all manuscript metadata, licensing,
          and distribution parameters provided are accurate. This book will be
          submitted for global release.
        </p>

        <div className="flex items-center justify-center gap-2 pt-1">
          <Button
            variant="secondary"
            onClick={() => modalRef?.current?.close?.()}
            disabled={submitting}
            className="rounded"
          >
            <span className="font-sans text-gray-100 text-tiny md:text-xs">
              Cancel
            </span>
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={submitting}
            loading={submitting}
            className="rounded"
          >
            <span className="font-sans text-gray-100 text-tiny md:text-xs">
              Confirm
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(CreateBookConfirmationModal);
