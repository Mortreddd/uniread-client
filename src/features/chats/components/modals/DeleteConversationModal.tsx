import Modal, { ModalRef } from "@/shared/components/Modal";
import { ChatConversationPreview } from "../../types/Chat";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { Button } from "@/shared/components/form/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteConversation } from "../../api/chat.service";
import { useAlert } from "@/contexts/AlertContext";

interface DeleteConversationModalProps {
  chat: ChatConversationPreview;
}

function DeleteConversationModal(
  { chat }: DeleteConversationModalProps,
  ref: Ref<ModalRef>,
) {
  const queryClient = useQueryClient();
  const innerRef = useRef<ModalRef | null>(null);
  const { showAlert } = useAlert();
  const mutation = useMutation({
    mutationFn: (chatId: string) => deleteConversation(chatId),
  });

  useImperativeHandle(ref, () => {
    return {
      open() {
        innerRef.current?.open();
      },
      close() {
        innerRef.current?.close();
      },
    };
  });
  async function confirmDelete() {
    try {
      await mutation.mutateAsync(chat.conversationId);

      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    } catch (error) {
      showAlert(
        "Something went wrong while deleting the conversation",
        "error",
      );
    } finally {
      innerRef.current?.close();
    }
  }

  return (
    <Modal ref={innerRef}>
      <div className="max-w-80 md:max-w-xs min-w-80 md:min-w-96 lg:max-w-md h-fit max-h-96 space-y-2">
        <ExclamationCircleIcon
          className={"size-14 lg:size-16 text-red-600 mx-auto"}
        />
        <h2 className="text-xl text-center md:text-2xl text-gray-800 dark:text-gray-100 font-newsreader">
          Warning
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-center text-sm lg:text-base font-sans tracking-light">
          Are you sure you want to delete this conversation?
        </p>
        <div className="mt-4 flex items-center justify-end">
          <Button
            onClick={() => innerRef.current?.close()}
            disabled={mutation.isPending}
            variant={"ghost"}
            className={"rounded"}
          >
            <span className={"text-gray-300 text-xs lg:text-sm"}>Cancel</span>
          </Button>
          <Button
            onClick={confirmDelete}
            variant={"danger"}
            disabled={mutation.isPending}
            loading={mutation.isPending}
            className={"rounded"}
          >
            <span className={"text-gray-300 text-xs lg:text-sm"}>Delete</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(DeleteConversationModal);
