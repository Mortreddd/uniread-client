import { forwardRef, Ref } from "react";
import Modal, { ModalRef } from "../../../shared/components/Modal.tsx";
import TextArea from "@/shared/components/form/TextArea";
import { Button } from "@/shared/components/form/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import DangerAlert from "@/shared/modal/alert/DangerAlert";
import api from "@/core/api/ApiService.ts";
import { AxiosError } from "axios";
import { useToast } from "@/contexts/ToastContext";
import { ErrorResponse } from "@/types/Error";

interface CreateCollaborationRequestModalProps {
  bookId: string;
  onCreateCollaboratorRequest: (isSuccess: boolean) => void;
}

function CreateCollaborationRequestModal(
  { bookId, onCreateCollaboratorRequest }: CreateCollaborationRequestModalProps,
  ref: Ref<ModalRef>
) {
  const { showToast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<{ message: string }>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<{ message: string }> = async (data) => {
    await api
      .post(`/books/${bookId}/collaboration-requests`, {
        message: data.message,
      })
      .then(() => {
        onCreateCollaboratorRequest(true);
        showToast("Collaboration request created successfully!", "info");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setError("root", {
          message: error.response?.data.message || "An error occurred",
        });
      });
  };

  return (
    <Modal ref={ref}>
      <div className="min-w-lg min-h-md relative isolate">
        <h1 className="text-center font-serif text-gray-800 font-medium text-2xl">
          Create Collaboration Request
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <DangerAlert iconSize="md" className={"w-full"}>
              <p className="text-md text-white">{errors.root.message}</p>
            </DangerAlert>
          )}
          <p className="text-lg font-serif font-medium mb-3 text-gray-800">
            You are about to send a collaboration request to the owner of this
            book.
          </p>
          <div className="mb-4">
            <TextArea
              {...register("message", { required: false })}
              id="message"
              rows={4}
              placeholder={"Message to the owner (optional)"}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button
              loading={isSubmitting}
              type="submit"
              variant={"info"}
              className={"text-sm w-full"}
            >
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default forwardRef(CreateCollaborationRequestModal);
