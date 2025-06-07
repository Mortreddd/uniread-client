import {forwardRef, Ref} from "react";
import Modal, {ModalRef} from "@/components/common/modal/Modal.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/components/common/form/Input.tsx";
import {Button} from "@/components/common/form/Button.tsx";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {Chapter} from "@/types/Chapter.ts";
import {ErrorResponse} from "@/types/Error.ts";
import {useToast} from "@/contexts/ToastContext.tsx";

interface AddNewChapterModalProps {
    bookId?: string;
    onCreate: (chapter: Chapter) => void;
}

interface CreateNewChapterModalProps {
    bookId?: string;
    title: string;
}


function AddNewChapterModal({ bookId, onCreate } : AddNewChapterModalProps, ref: Ref<ModalRef>) {
    const { showToast} = useToast();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateNewChapterModalProps>({
        defaultValues: {
            bookId,
            title: ""
        }
    })

    const onSubmit: SubmitHandler<CreateNewChapterModalProps> = async (data) => {
        await api.post(`/books/${data.bookId}/chapters/create`, data)
            .then((response: AxiosResponse<Chapter>) => {
                showToast("You created a new chapter!", "success")
                onCreate(response.data)
            }).catch((error: AxiosError<ErrorResponse>) => {
                showToast(error?.response?.data.message ?? "Something went wrong creating chapter", "error")
            })
    }

    return(
        <Modal ref={ref}>
            <form onSubmit={handleSubmit(onSubmit)} className={'min-w-96 w-fit'}>
                <h1 className={'text-2xl font-sans font-semibold text-900 text-center mb-4'}>
                    Create New Chapter
                </h1>
                <div className={'w-full space-y-2 mb-5'}>
                    <label className={'font-sans font-semibold text-xl text-gray-700'}></label>
                    <Input {...register("title")} variant={'primary'} className={'w-full'} placeholder={"Chapter title"}/>
                </div>
                <Button loading={isSubmitting} type={"submit"} variant={'primary'} className={'w-full rounded-sm'}>
                    Create Chapter
                </Button>
            </form>
        </Modal>
    )
}

export default forwardRef(AddNewChapterModal);
