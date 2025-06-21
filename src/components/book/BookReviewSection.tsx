import { StarIcon } from "@heroicons/react/24/outline";
import { Button } from "../common/form/Button";
import TextArea from "../common/form/TextArea";
import LoginModal from "../common/modal/auth/LoginModal";
import api from "@/services/ApiService";
import {
  CreateReviewFormProps,
  BookComment as BookCommentType,
} from "@/types/Book";
import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ModalRef } from "../common/modal/Modal";
import { ErrorResponse } from "@/types/Error";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import useGetBookComments from "@/api/comments/useGetBookComments.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import BookComment from "../comment/BookComment";
import { Reaction } from "@/types/Enums";
import useReaction from "@/hooks/useReaction";

interface BookReviewSectionProps {
  bookId?: string;
}

export default function BookReviewSection({ bookId }: BookReviewSectionProps) {
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const loginModalRef = useRef<ModalRef>(null);
  const { createReaction, removeReaction } = useReaction();

  const [{ pageNo, pageSize, sortBy, orderBy }, setParams] =
    useState<PaginateParams>({
      pageNo: 0,
      pageSize: 10,
      sortBy: "desc",
      orderBy: "rating",
    });

  const [comments, setComments] = useState<BookCommentType[]>([]);
  const { data, loading } = useGetBookComments({
    bookId,
    pageNo,
    pageSize,
    sortBy,
    orderBy,
  });

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewFormProps>({
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  const onReviewSubmit: SubmitHandler<CreateReviewFormProps> = async (data) => {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    await api
      .post(`/books/${bookId}/comments/create`, data)
      .then((response: AxiosResponse<BookCommentType>) => {
        setComments((prev) => {
          if (prev.some((c) => c.id === response.data.id)) {
            return prev.map((c) =>
              c.id === response.data.id ? response.data : c
            );
          }

          return [...prev, response.data];
        });
        reset({ rating: 0, content: "" });
        showToast("Review submitted successfully!", "success");
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        console.error(error);
        showToast(
          error?.response?.data?.message || "Failed to submit review",
          "error"
        );
      });
  };

  function handleShowMore() {
    if (!data || data.last) return;

    setParams((prev) => ({ ...prev, pageNo: (prev.pageNo ?? 0) + 1 }));
  }

  useEffect(() => {
    if (!data) return;

    setComments((prevComments) => {
      if (pageNo === 0) return data.content;
      return [
        ...prevComments,
        ...data.content.filter(
          (c) => !prevComments.some((pc) => pc.id === c.id)
        ),
      ];
    });
  }, [data, pageNo]);

  function onReactComment(url: string, reaction: Reaction) {
    // Call the onReactComment prop with the URL and reaction
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }
    createReaction(url, reaction);
  }

  function onRemoveReactionComment(url: string) {
    if (!isLoggedIn()) {
      loginModalRef.current?.open();
      return;
    }

    removeReaction(url);
  }

  return (
    <>
      <div className="space-y-4 p-4 w-full bg-gray-100 rounded-lg">
        <h1 className="block text-2xl font-bold text-gray-800 my-4">
          Feedbacks
        </h1>
        {/* <div className="flex justify-between my-2 items-center">
        </div> */}
        <div className="min-h-52 w-full my-5 space-y-4">
          {loading && !data?.content ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingCircle size={"lg"} />
            </div>
          ) : !loading && comments.length > 0 ? (
            comments.map((comment) => (
              <BookComment
                key={comment.id}
                comment={comment}
                className={"block"}
                onReactComment={onReactComment}
                onRemoveReactionComment={onRemoveReactionComment}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-lg font-serif">No comments yet</p>
            </div>
          )}

          {!loading && !data?.last && (
            <div className="w-full flex justify-center mt-5">
              <p
                onClick={handleShowMore}
                className="text-yellow-500 hover:text-yellow-600 font-serif text-bold text-xl transition-all duration-200 ease-in-out cursor-pointer"
              >
                Show More
              </p>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onReviewSubmit)}
          className={"w-full h-full"}
        >
          <div className="bg-gray-100 w-full rounded-lg">
            <LoginModal ref={loginModalRef} />
            <h1 className="block text-2xl font-bold text-gray-800 mb-2">
              Review
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Share your thoughts about the book. What did you like or dislike?
              How did it make you feel? Your insights can help others decide
              whether to read it.
            </p>
            {/* <p className="text-sm font-semibold block mb-3">Rate the book</p> */}
            <div className="flex justify-center items-center mb-5 gap-2">
              <div className="inline-flex gap-3 items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`size-7 text-yellow-600  cursor-pointer transition-all duration-200 ease-in-out hover:drop-shadow-sm hover:shadow-yellow-500 hover:scale-110`}
                    fill={index < watch("rating") ? "currentColor" : "none"}
                    onClick={() => setValue("rating", index + 1)}
                  />
                ))}
              </div>
            </div>
            <div className="block mb-3">
              <h2 className="text-lg font-serif text-gray-800 font-medium">
                Your Review
              </h2>
              {errors.content && (
                <p className="text-red-500 text-sm my-1">
                  {errors.content.message || "Review content is required."}
                </p>
              )}
              <TextArea
                className="w-full"
                rows={5}
                placeholder="Write your review here..."
                {...register("content", {
                  required: "Review content is required.",
                })}
              ></TextArea>
            </div>
            <div className="block">
              <Button
                type={"submit"}
                loading={isSubmitting}
                variant="warning"
                className="w-full rounded"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
