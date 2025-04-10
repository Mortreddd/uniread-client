import Navbar from "@/components/common/navbar/Navbar.tsx";
import { Input } from "@/components/common/form/Input.tsx";
import TextArea from "@/components/common/form/TextArea.tsx";
import Footer from "@/components/Footer";
import Label from "@/components/common/form/Label";
import useGetGenres from "@/api/genres/useGetGenres";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Genre } from "@/types/Book";
import GenreOption from "@/components/genre/GenreOption";
import Toggle from "@/components/common/form/Toggle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/common/form/Button";

interface CreateBookFormProps {
  title: string;
  authorId: string | null;
  coverPhoto: File | null;
  genreIds: number[] | null;
  description: string;
  matured: boolean;
}

export default function CreateBookPage() {
  const { user } = useAuth();
  const authorId = user?.id || null;
  const { data } = useGetGenres();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const genreIds = useMemo(() => {
    return selectedGenres.map((genre) => genre.id);
  }, [selectedGenres]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateBookFormProps>({
    defaultValues: {
      title: "",
      genreIds: [],
      authorId: authorId,
      coverPhoto: null,
      description: "",
      matured: false,
    },
  });

  const memoizedGenres = useMemo(() => {
    if (!data) return [];

    return data;
  }, [data]);

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenres((prev) => {
      return prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre];
    });

    console.log(selectedGenres);
  };

  function onSelectImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setValue("coverPhoto", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  }

  const onSubmit: SubmitHandler<CreateBookFormProps> = async (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    setValue("authorId", authorId);
    setValue("genreIds", genreIds);
  }, [authorId, genreIds, setValue]);

  useEffect(() => {
    setValue(
      "genreIds",
      selectedGenres.map((genre) => genre.id)
    );
  }, [selectedGenres]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error("Form Errors:", errors);
    }
  }, [errors]);

  return (
    <main className={"w-full h-screen antialiased"}>
      <div className={"w-full"}>
        <Navbar />
      </div>

      <div
        className={"w-full max-h-fit flex justify-center items-center py-10"}
      >
        <div className="w-[60%]">
          <h1 className={"text-3xl font-sans mb-4 font-bold"}>
            Details of your new story
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"w-full h-fit px-5 py-3"}
          >
            <div className={"w-full relative mb-4"}>
              <Label
                className={"block mb-2"}
                variant={"default"}
                labelSize={"xl"}
              >
                Title
              </Label>
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
              <Input
                variant={"primary"}
                inputSize={"lg"}
                {...register("title", {
                  required: "Book title is required",
                })}
                placeholder={"Enter your book title"}
                className={"w-full block"}
              />
            </div>
            <div className={"w-full relative mb-4"}>
              <Label
                className={"block mb-2"}
                variant={"default"}
                labelSize={"xl"}
              >
                Synopsis
              </Label>
              <TextArea
                variant={"primary"}
                {...register("description", {
                  required: "Book sypnosis is required",
                })}
                className={"w-full"}
                placeholder={"Enter your book description"}
              ></TextArea>
            </div>
            <div className="w-full flex gap-3 mb-4 flex-wrap">
              {memoizedGenres.map((genre) => (
                <GenreOption
                  genre={genre}
                  key={genre.id}
                  genreIds={genreIds}
                  onClick={() => handleSelectGenre(genre)}
                />
              ))}
            </div>
            <div className="w-full relative mb-4 flex gap-2 items-center">
              <Label
                className={"block mb-2"}
                variant={"default"}
                labelSize={"xl"}
              >
                Classification <strong>(Mature)</strong>
              </Label>
              <Toggle {...register("matured")} />
            </div>
            <div className="w-full relative mb-4">
              <Label
                className={"block mb-2"}
                variant={"default"}
                labelSize={"xl"}
              >
                Genre:{" "}
                {selectedGenres.length !== 0
                  ? selectedGenres.map((g) => g.name).join(", ")
                  : "Select a genre"}
              </Label>
            </div>
            <div className="w-full relative mb-4">
              <Label className="block mb-2" variant="default" labelSize="xl">
                Cover
              </Label>
              <div className="flex w-full h-fit">
                <div className="h-52 w-40 rounded overflow-hidden relative bg-gray-200">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    {...register("coverPhoto")}
                    className="hidden"
                    onChange={onSelectImage}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`absolute inset-0 flex items-center justify-center ${
                      selectedImage === null
                        ? "text-gray-500 bg-gray-100"
                        : "bg-transparent"
                    }  cursor-pointer transition-all duration-200 ease-in-out`}
                  >
                    {selectedImage ? null : "Upload Cover"}
                  </label>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover transition-all duration-200 ease-in-out hover:opacity-90 object-center"
                    />
                  )}
                </div>
                <div className="flex-1 flex justify-center items-center mb-4">
                  <div className="w-full h-fit flex flex-col items-center px-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                    <p className="text-lg text-gray-500 font-sans">
                      Once you submit this photo, it becomes a permanent part of
                      this story and cannot be modified or removed, so please
                      choose your image carefully.{" "}
                      <strong>
                        (This photo is for the purpose of enhancing your story
                        and should be relevant to the theme or subject of your
                        story.)
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <Button
                  type={"submit"}
                  loading={isSubmitting}
                  variant={"primary"}
                  className={"rounded"}
                >
                  Create Book
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full ">
        <Footer />
      </div>
    </main>
  );
}
