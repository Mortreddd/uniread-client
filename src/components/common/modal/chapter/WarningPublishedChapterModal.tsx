import {forwardRef, Ref} from "react";
import Modal, {ModalRef} from "@/components/common/modal/Modal.tsx";
import {Chapter} from "@/types/Chapter.ts";
import {ExclamationCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/common/form/Button.tsx";

interface WarningPublishedChapterProps {
    chapter?: Chapter;
    onCancel: () => void;
    onDelete: (chapter?: Chapter) => Promise<void>;
}

function WarningPublishedChapterModal({ chapter, onCancel, onDelete }: WarningPublishedChapterProps, ref : Ref<ModalRef>) {

    const message = !chapter?.isPublished ?
        "The chapter is currently published and deleting the chapter will also delete comments, likes and the content of the chapter." :
        "Deleting the chapter will lose all the content of the chapter.";
    return(
        <Modal ref={ref} className={'w-96 h-fit'}>
            <form className={'inline-block w-full p-1'}>
                <ExclamationCircleIcon className={'size-10 mx-auto text-gray-400'} />
                <h3 className={'text-center font-sans text-2xl text-gray-800 mt-5'}>Are you sure deleting {chapter?.title}</h3>
                <p className={'text-center text-wrap font-sans text-gray-600 mt-2 text-sm'}>
                    {message}
                </p>

                <div className={'flex justify-around items-center mt-8 w-full'}>
                    <Button type={"button"} variant={'light'} className={"rounded-sm"} onClick={() => onCancel()}>
                        Cancel
                    </Button>
                    <Button type={"button"} variant={'danger'} className={"rounded-sm"} onClick={() => onDelete(chapter)}>
                        Confirm Deletion
                    </Button>
                </div>
            </form>
        </Modal>
    )
}


export default forwardRef(WarningPublishedChapterModal);