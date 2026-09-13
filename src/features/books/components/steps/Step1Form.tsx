import { useAlert } from "@/contexts/AlertContext";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export interface Step1Data {
  cover: null | File;
}

export default function Step1Form() {
  const { showAlert } = useAlert();

  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<Step1Data>();

  const bookCoverRef = useRef<HTMLInputElement | null>(null);
  const [tempCover, setTempCover] = useState<string | undefined>(undefined);

  // Register cover with validation, without attaching to the file input's DOM value
  useEffect(() => {
    register("cover", { required: "Cover image is required" });
  }, [register]);

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showAlert("Max file is 10MB", "error");
        return;
      }

      if (tempCover !== undefined && tempCover.startsWith("blob:")) {
        URL.revokeObjectURL(tempCover);
      }

      setValue("cover", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setTempCover(URL.createObjectURL(file));
    }
  }

  // cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (tempCover?.startsWith("blob:")) URL.revokeObjectURL(tempCover);
    };
  }, [tempCover]);

  const coverError = errors.cover?.message;

  return (
    <div className="relative w-full bg-gray-200 dark:bg-slate-800 rounded-lg p-2 md:p-3 shadow">
      <div
        onClick={() => bookCoverRef.current?.click()}
        className={[
          "w-36 h-52 md:w-40 md:h-56 border border-solid flex bg-gray-100 mx-auto",
          "dark:bg-slate-900 items-center justify-center rounded-lg overflow-hidden hover:cursor-pointer",
          coverError
            ? "border-red-500 dark:border-red-500"
            : "border-primary dark:border-primary-dark",
        ].join(" ")}
      >
        <div className="relative space-y-2 md:space-y-3">
          {tempCover ? (
            <img
              src={tempCover}
              className="size-full object-cover object-center"
              alt="Cover image"
            />
          ) : (
            <div className="space-y-2 md:space-y-3">
              <PhotoIcon className="text-gray-700 dark:text-gray-300 size-7 md:size-8 mx-auto mb-1" />
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-sans tracking-wide text-center">
                Recommended
              </p>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-sans tracking-wide text-center">
                600 x 900px
              </p>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-sans tracking-wide text-center">
                Upload Cover
              </p>
            </div>
          )}
          <input
            onChange={handleFileUpload}
            ref={bookCoverRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Error message */}
      {coverError && (
        <p
          role="alert"
          className="mt-2 text-center text-tiny md:text-xs font-sans text-red-600 dark:text-red-400"
        >
          {coverError}
        </p>
      )}
    </div>
  );
}
