import {Book} from "@/types/Book.ts";
import {forwardRef, Ref} from "react";
import Modal, {ModalProps, ModalRef} from "@/components/common/modal/Modal.tsx";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/common/form/Button.tsx";

interface DeleteBookModalProps extends ModalProps {
    book: Book;
    onDelete: (book: Book) => Promise<void>
    onCancel: () => void;
}

function DeleteBookModal({ book, onDelete, onCancel } : DeleteBookModalProps, ref: Ref<ModalRef>) {
    return(
        <Modal ref={ref} className={"w-96 h-fit rounded p-4"}>
            <ExclamationCircleIcon className={"mb-3 size-16 block mx-auto bg-transparent text-red-500"} />
            <p className={"text-center mb-4 text-lg text-gray-600 font-sans font-semibold"}>
                You won't be able to undo this operation by deleting this book.
            </p>
            <div className={"flex justify-around items-center "}>
                <Button variant={'light'} className={"rounded-lg"} onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant={'danger'} className={"rounded-lg"} onClick={() => onDelete(book)}>
                    Delete
                </Button>
            </div>
        </Modal>
    )


}


export default forwardRef(DeleteBookModal);
