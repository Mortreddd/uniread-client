import useGetGenres from "@/api/genres/useGetGenres";
import { Button } from "@/components/common/form/Button";
import { Input } from "@/components/common/form/Input";
import Label from "@/components/common/form/Label";
import TextArea from "@/components/common/form/TextArea";
import Toggle from "@/components/common/form/Toggle";
import GenreOption from "@/components/genre/GenreOption";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/ApiService";
import { Genre, CreateBookFormProps, Book } from "@/types/Book";
import { ErrorResponse } from "@/types/Error";
import { RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useToast} from "@/contexts/ToastContext.tsx";

export default function CreateBookForm() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const authorId = user?.id || null;
  const { data } = useGetGenres();
  const [{ loading }, setRequestState] = useState<RequestState<Book>>({
    data: null,
    error: null,
    loading: false,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

  const genreIds = useMemo(() => {
    return selectedGenres.map((genre) => genre.id);
  }, [selectedGenres]);

  const memoizedGenres = useMemo(() => {
    if (!data) return [];

    return data;
  }, [data]);

  const [formValues, setFormValues] = useState<CreateBookFormProps>({
    title: "",
    description: "",
    matured: false,
    authorId: null,
    genreIds: [],
    photo: null,
  });

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenres((prev) => {
      const updatedGenres = prev.some((g) => g.id === genre.id)
        ? prev.filter((g) => g.id !== genre.id)
        : [...prev, genre];

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        genreIds: updatedGenres.map((g) => g.id),
      }));

      return updatedGenres;
    });
  };

  function onSelectImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setFormValues({ ...formValues, photo: file });
      setSelectedImage(URL.createObjectURL(file));
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setRequestState((prev) => ({ ...prev, loading: true }));
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    formData.append("matured", String(formValues.matured));
    formData.append("authorId", String(formValues.authorId));
    formValues.genreIds.forEach((genreId) => {
      formData.append("genreIds", genreId.toString());
    });
    if (formValues.photo) {
      formData.append("photo", formValues.photo as Blob, formValues.photo.name);
    }

    await api
      .post("/books/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: AxiosResponse<Book>) => {
        setRequestState((prev) => ({
          ...prev,
          loading: false,
          data: response.data,
        }));
        setFormValues({
          title: "",
          description: "",
          matured: false,
          authorId: null,
          genreIds: [],
          photo: null,
        });
        setSelectedGenres([]);
        navigate("/stories/published", { replace: true });
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setRequestState((prev) => ({
          ...prev,
          loading: false,
          error: error.response?.data.message || "An error occurred",
        }));
        showToast(
          error.response?.data.message ||
            "Failed to create book. Please try again.",
          "error"
        );
      });
  }

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, authorId }));
  }, [authorId]);

  return (
    <div className="w-[60%]">
      <h1 className={"text-3xl font-sans mb-4 font-bold"}>
        Details of your new story
      </h1>
      <form onSubmit={onSubmit} className={"w-full h-fit px-5 py-3"}>
        <div className={"w-full relative mb-4"}>
          <Label className={"block mb-2"} variant={"default"} labelSize={"xl"}>
            Title
          </Label>
          {/* {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )} */}
          <Input
            variant={"primary"}
            inputSize={"lg"}
            // {...register("title", {
            //   required: "Book title is required",
            // })}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
            placeholder={"Enter your book title"}
            className={"w-full block"}
          />
        </div>
        <div className={"w-full relative mb-4"}>
          <Label className={"block mb-2"} variant={"default"} labelSize={"xl"}>
            Synopsis
          </Label>
          <TextArea
            variant={"primary"}
            // {...register("description", {
            //   required: "Book sypnosis is required",
            // })}
            className={"w-full"}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
            rows={5}
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
          <Label className={"block mb-2"} variant={"default"} labelSize={"xl"}>
            Classification <strong>(Mature)</strong>
          </Label>
          {/* <Toggle {...register("matured")} /> */}
          <Toggle
            checked={formValues.matured}
            onChange={(e) =>
              setFormValues({ ...formValues, matured: e.target.checked })
            }
          />
        </div>
        <div className="w-full relative mb-4">
          <Label className={"block mb-2"} variant={"default"} labelSize={"xl"}>
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
            <div className="h-52 w-40 rounded-sm overflow-hidden relative bg-gray-200">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                // {...register("coverPhoto")}
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
                  this story and cannot be modified or removed, so please choose
                  your image carefully.{" "}
                  <strong>
                    (This photo is for the purpose of enhancing your story and
                    should be relevant to the theme or subject of your story.)
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              type={"submit"}
              loading={loading}
              variant={"primary"}
              className={"rounded-sm"}
            >
              Create Book
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
