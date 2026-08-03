import { Button } from "@/shared/components/form/Button";
import Modal, { ModalRef } from "@/shared/components/Modal";
import { CameraIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import defaultProfile from "@/assets/profiles/default-profile.jpg";
import { useAlert } from "@/contexts/AlertContext";
import { upload } from "@/shared/services/file-upload.service";
import { useUpdateAvatar } from "../../hooks/useUpdateAvatar";

interface AvatarPhotoModalProps {
  avatarPhoto?: string;
  onUpdate: (newAvatarUrl: string) => void;
}
function AvatarPhotoModal(
  { avatarPhoto, onUpdate }: AvatarPhotoModalProps,
  ref: Ref<ModalRef>,
) {
  const defaultPhoto = avatarPhoto ?? defaultProfile;
  const { showAlert } = useAlert();
  const updateAvatarMutation = useUpdateAvatar();
  const [photo, setPhoto] = useState<string>(defaultPhoto);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ModalRef>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      setPhoto(defaultPhoto);
      setSelectedFile(null);
      modalRef.current?.open();
    },
    close: () => modalRef.current?.close(),
  }));

  useEffect(() => {
    return () => {
      if (photo !== defaultPhoto && photo.startsWith("blob:")) {
        URL.revokeObjectURL(photo);
      }
    };
  }, [photo, defaultPhoto]);

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showAlert("Max file is 10MB", "error");
        return;
      }

      if (photo !== defaultPhoto && photo.startsWith("blob:")) {
        URL.revokeObjectURL(photo);
      }

      setSelectedFile(file);
      setPhoto(URL.createObjectURL(file));
    }
  }

  function handleCancel() {
    setPhoto(defaultPhoto);
    setSelectedFile(null);
    modalRef.current?.close();
  }

  async function handleUpdate() {
    if (selectedFile) {
      const { secure_url, public_id } = await upload(
        "/me/profile/avatar",
        selectedFile,
        { type: "avatar" },
      );

      if (secure_url && public_id) {
        updateAvatarMutation.mutate({
          url: secure_url,
          publicId: public_id,
        });

        onUpdate(secure_url);

        showAlert("Profile photo updated successfully", "success");
        modalRef.current?.close();
      }
    }
  }

  return (
    <Modal ref={modalRef}>
      <div className="rounded-xs p-3 space-y-1 bg-gray-100 max-w-96 min-w-72 md:min-w-96 dark:bg-slate-800">
        <h1 className="text-gray-800 dark:text-gray-100 text-base md:text-lg lg:text-xl text-center font-serif font-medium block">
          Update Profile Photo
        </h1>

        <div
          className="relative mx-auto size-20 md:size-32 rounded-lg group overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          <img src={photo} className="size-full object-cover object-center" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute hidden md:flex inset-0 items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition"
          >
            <input
              onChange={handleFileUpload}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <CameraIcon className="size-8 md:size-12 text-gray-100" />
          </motion.div>
        </div>

        <div className="mt-4 flex items-center w-full gap-2 md:gap-4">
          <Button
            variant="dark"
            className="rounded flex-1"
            onClick={handleCancel}
          >
            <span className="text-tiny md:text-xs lg:text-sm">Cancel</span>
          </Button>
          <Button
            className="rounded flex-1"
            onClick={handleUpdate}
            loading={updateAvatarMutation.isPending}
            disabled={updateAvatarMutation.isPending || !selectedFile}
          >
            <span className="text-tiny md:text-xs lg:text-sm">Update</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(AvatarPhotoModal);
