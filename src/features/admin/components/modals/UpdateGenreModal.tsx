import { Button } from "@/shared/components/form/Button";
import Modal, { ModalRef } from "@/shared/components/Modal";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
import { useAlert } from "@/contexts/AlertContext";
import { GenreDetail } from "../../types/Genre";
import { SubmitHandler, useForm } from "react-hook-form";
import Label from "@/shared/components/form/Label";
import { Input } from "@/shared/components/form/Input";
import { useUpdateGenreMutation } from "../../hooks/useGenre";

interface UpdateGenreModalProps {
  genre: GenreDetail;
  onUpdate: (genre: GenreDetail) => void;
}

interface UpdateGenreProps extends Omit<
  GenreDetail,
  "bookCount" | "updatedAt" | "createdAt"
> {}

function UpdateGenreModal(
  { genre, onUpdate }: UpdateGenreModalProps,
  ref: Ref<ModalRef>,
) {
  const { showAlert } = useAlert();
  const modalRef = useRef<ModalRef>(null);
  const updateGenreMutation = useUpdateGenreMutation();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<UpdateGenreProps>({
    mode: "onChange",
    defaultValues: {
      id: genre.id,
      name: genre.name,
      description: genre.description,
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      reset({
        id: genre.id,
        name: genre.name,
        description: genre.description,
      });
      clearErrors();
      modalRef.current?.open();
    },
    close: () => modalRef.current?.close(),
  }));

  function clearFields() {
    clearErrors(["name", "description"]);
    reset({
      id: genre.id,
      name: genre.name,
      description: genre.description,
    });
  }
  function handleCancel() {
    clearFields();
    modalRef.current?.close();
  }

  const onSubmit: SubmitHandler<UpdateGenreProps> = async (data) => {
    try {
      const updatedGenre = await updateGenreMutation.mutateAsync(data);
      if (updatedGenre) {
        onUpdate(updatedGenre);
        showAlert("Genre updated successfully", "success");
      }
    } catch (error: any) {
      const response = error?.response?.data;

      if (response?.fieldErrors) {
        Object.entries(response.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof UpdateGenreProps, {
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
          Update Genre
        </h1>
        {errors.root?.message && (
          <div className="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <span className="text-xs text-red-600 dark:text-red-400 lg:text-sm font-sans text-center block">
              {errors.root.message}
            </span>
          </div>
        )}

        <div className="relative my-2">
          <Label>Genre Name</Label>
          <Input
            {...register("name", {
              required: "Genre name is required",
              pattern: {
                value: /^[a-zA-Z0-9 ]+$/,
                message: "Invalid value for genre name",
              },
            })}
            error={errors?.name?.message}
            limit={30}
            showLimitIndicator={true}
            className={"w-full"}
            placeholder={"E.g, Romance, Fiction"}
          />
        </div>
        <div className="relative my-2">
          <Label>Description</Label>
          <Input
            {...register("description", {
              pattern: {
                value: /^[a-zA-Z0-9\s.,!?]+$/,
                message: "Invalid value for description",
              },
            })}
            error={errors?.description?.message}
            limit={200}
            showLimitIndicator={true}
            className={"w-full"}
          />
        </div>
        <div className="flex items-center w-full gap-2 md:gap-4">
          <Button
            type={"button"}
            variant="secondary"
            className="rounded flex-1"
            disabled={updateGenreMutation.isPending}
            onClick={handleCancel}
          >
            <span className="text-tiny md:text-xs lg:text-sm">Cancel</span>
          </Button>
          <Button
            variant="warning"
            type="submit"
            className="rounded flex-1"
            loading={updateGenreMutation.isPending}
            disabled={updateGenreMutation.isPending || !isValid}
          >
            <span className="text-tiny md:text-xs lg:text-sm">Update</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default forwardRef(UpdateGenreModal);
