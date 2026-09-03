import { Button } from "@/shared/components/form/Button";
import Modal, { ModalRef } from "@/shared/components/Modal";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { useAlert } from "@/contexts/AlertContext";
import { SubmitHandler, useForm } from "react-hook-form";
import Label from "@/shared/components/form/Label";
import { Input } from "@/shared/components/form/Input";
import { TagDetail } from "../../types/Tag";
import { useUpdateTagMutation } from "../../hooks/useTag";

interface UpdateTagModalProps {
  tag: TagDetail;
  onUpdate: (tag: TagDetail) => void;
}

interface UpdateTagProps extends Omit<
  TagDetail,
  "usageCount" | "updatedAt" | "createdAt"
> {}

function UpdateTagModal(
  { tag, onUpdate }: UpdateTagModalProps,
  ref: Ref<ModalRef>,
) {
  const { showAlert } = useAlert();
  const modalRef = useRef<ModalRef>(null);
  const updateTagMutation = useUpdateTagMutation();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<UpdateTagProps>({
    defaultValues: {
      id: tag.id,
      name: tag.name,
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      reset({
        id: tag.id,
        name: tag.name,
      });
      clearErrors();
      modalRef.current?.open();
    },
    close: () => modalRef.current?.close(),
  }));

  function clearFields() {
    reset({ name: "" });
    clearErrors(["name"]);
  }

  function handleCancel() {
    clearFields();
    modalRef.current?.close();
  }

  const onSubmit: SubmitHandler<UpdateTagProps> = async (data) => {
    try {
      const tag = await updateTagMutation.mutateAsync(data);
      if (tag) {
        onUpdate(tag);
        clearFields();

        showAlert("Tag created successfully", "success");
        modalRef.current?.close();
      }
    } catch (error: any) {
      const response = error?.response?.data;

      if (response?.fieldErrors) {
        Object.entries(response.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof UpdateTagProps, {
            type: "server",
            message: message as string,
          });
        });
      }

      if (response?.message) {
        setError("root", {
          type: "server",
          message: response.message,
        });
        showAlert(response.message, "error");
      }
    }
  };

  return (
    <Modal ref={modalRef}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xs p-3 space-y-1 max-w-96 min-w-72 md:min-w-96"
      >
        <h1 className="text-gray-800 dark:text-gray-100 text-base md:text-lg lg:text-xl text-center font-serif font-medium block">
          Update New Tag
        </h1>
        {errors.root?.message && (
          <div className="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <span className="text-xs text-red-600 dark:text-red-400 lg:text-sm font-sans text-center block">
              {errors.root.message}
            </span>
          </div>
        )}

        <div className="relative my-2">
          <Label>Tag Label</Label>
          <Input
            {...register("name", {
              required: "Tag name is required",
              pattern: {
                value: /^[a-zA-Z0-9 ]+$/,
                message: "Invalid value for tag name",
              },
            })}
            error={errors?.name?.message}
            limit={15}
            showLimitIndicator={true}
            className={"w-full"}
            placeholder={"E.g, Romance, Fiction"}
          />
        </div>
        <div className="flex items-center w-full gap-2 md:gap-4">
          <Button
            type={"button"}
            variant="secondary"
            className="rounded flex-1"
            disabled={updateTagMutation.isPending}
            onClick={handleCancel}
          >
            <span className="text-tiny md:text-xs lg:text-sm">Cancel</span>
          </Button>
          <Button
            type={"submit"}
            variant={"warning"}
            className="rounded flex-1"
            loading={updateTagMutation.isPending}
            disabled={updateTagMutation.isPending || !isValid}
          >
            <span className="text-tiny md:text-xs lg:text-sm">Update</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default forwardRef(UpdateTagModal);
