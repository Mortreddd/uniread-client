import { useAlert } from "@/contexts/AlertContext";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateBookRequest } from "../types/Book";
import Label from "@/shared/components/form/Label";
import { Input } from "@/shared/components/form/Input";
import TextEditor from "@/shared/toolbar/TextEditor";
import { Descendant } from "slate";

const initialValue: Descendant[] = [
  {
    type: "h1",
    children: [{ text: "Hello World" }],
  },
  {
    type: "p",
    children: [{ text: "This is a paragraph" }],
  },
];

export default function CreateBook() {
  const { showAlert } = useAlert();
  const [description, setDescription] = useState<Descendant[]>(initialValue);
  const bookCoverRef = useRef<HTMLInputElement | null>(null);
  const [tempCover, setTempCover] = useState<string | undefined>(undefined);
  const { register, setValue, watch } = useForm<CreateBookRequest>({
    defaultValues: {
      title: "",
      description: "",
      coverPhoto: null,
      genres: [],
      matured: false,
      tags: [],
      collaboratorIds: [],
    },
  });

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

      setValue("coverPhoto", file);
      setTempCover(URL.createObjectURL(file));
    }
  }

  return (
    <div className="size-full overflow-y-auto max-w-full">
      <div className="mb-1 md:mb-1.5">
        <h1 className="text-lg md:text-xl lg:text-2xl font-sans font-medium tracking-light text-gray-800 dark:text-gray-200">
          Create New Book
        </h1>
        <div className="flex flex-col lg:flex-row items-start justify-start lg:items-center gap-3 lg:gap-0 lg:justify-between mb-2 md:mb-3">
          <p className="text-gray-700 dark:text-gray-300 font-thin font-sans text-xs md:text-sm lg:text-base">
            Tell you story to the world. Start by filling out the basic details.
          </p>
        </div>

        <div className="grid grid-cols-12 w-full gap-3">
          <div className="relative w-full col-span-12 lg:col-span-4 bg-gray-200 dark:bg-slate-800 rounded-lg p-2 md:p-3">
            <div
              onClick={() => {
                bookCoverRef.current?.click();
              }}
              className="w-36 h-52 md:w-40 md:h-56 border border-solid flex bg-gray-100 mx-auto dark:bg-slate-900 items-center justify-center border-primary dark:border-primary-dark rounded-lg overflow-hidden hover:cursor-pointer"
            >
              <div className="relative space-y-2 md:space-y-3">
                {tempCover ? (
                  <img
                    src={tempCover}
                    className={"size-full object-cover object-center"}
                    alt="Cover image"
                  />
                ) : (
                  <div className={"space-y-2 md:space-y-3"}>
                    <PhotoIcon
                      className={
                        "text-gray-700 dark:text-gray-300 size-7 md:size-8 mx-auto mb-1"
                      }
                    />
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
          </div>

          <div className="relative col-span-12 lg:col-span-8 p-2 md:p-3 rounded-lg bg-gray-200 dark:bg-slate-800">
            <div className="mb-4 lg:mb-6">
              <Label className={"font-semibold"}>STORY TITLE</Label>
              <Input
                inputSize={"lg"}
                className={"w-full"}
                placeholder={"e.g. The Shackles"}
              />
            </div>
            <div className="relative space-y-1 lg:space-y-1.5">
              <Label className={"font-semibold"}>DESCRIPTION / BLURB</Label>
              <TextEditor
                className={"min-h-52"}
                values={description}
                onSlateChange={setDescription}
                placeholder=""
              />
              <p className="text-tiny lg:text-xs text-gray-800 dark:text-gray-200 font-sans tracking-light">
                Maximum 2,000 characters. Keep it punchy!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
