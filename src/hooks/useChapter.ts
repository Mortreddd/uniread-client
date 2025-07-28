import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/Error.ts";
import { useCallback, useEffect, useState } from "react";
import api from "@/services/ApiService.ts";
import { Chapter } from "@/types/Chapter.ts";
import useGetBookChapters from "@/api/chapters/useGetBookChapters.ts";
import { PaginateParams } from "@/types/Pagination.ts";
import { SuccessResponse } from "@/types/Success.ts";
import { ChapterStatus } from "@/types/Enums.ts";

interface ResultHandlerProps {
  onUpdate: (chapter: Chapter) => void;
  onForceDelete: (message: string) => void;
  onDelete: (message: string) => void;
  onError: (message: string) => void;
}

interface ChapterProps extends PaginateParams {
  bookId: string;
}

export default function useChapter({ bookId, pageNo, pageSize }: ChapterProps) {
  const { data, loading, error } = useGetBookChapters({
    bookId,
    pageNo,
    pageSize,
  });

  /**
   * Get the chapters of the following book
   */
  const [chapters, setChapters] = useState<Chapter[]>([]);

  /**
   * Get the chapter from array of chapters
   * @returns {Chapter|undefined} the results are based on condition
   */
  const getChapterById: (chapterId: string) => Chapter | undefined =
    useCallback(
      (chapterId: string) => {
        return chapters.find((c) => c.id === chapterId);
      },
      [chapters]
    );

  /**
   * Update a chapter of a book
   * @param {string} chapterId The ID of the chapter to update
   * @param {T} payload The update payload
   * @param {Object} handlers Callbacks for handling results
   * @param {Function} handlers.onUpdate Called on successful update
   * @param {Function} handlers.onError Called when an error occurs
   * @returns {Promise<void>} A promise that resolves when the update is complete
   */
  const onUpdateChapter = useCallback(
    async <T>(
      chapterId: string,
      payload: T,
      {
        onUpdate,
        onError,
      }: Omit<ResultHandlerProps, "onDelete" | "onForceDelete">
    ): Promise<void> => {
      try {
        const response = await api.put<Chapter>(
          `/books/${bookId}/chapters/${chapterId}`,
          payload
        );

        setChapters((prev) =>
          prev.map((chapter) =>
            chapter.id === chapterId ? response.data : chapter
          )
        );

        onUpdate?.(response.data);
      } catch (error) {
        const errorMessage =
          (error as AxiosError<ErrorResponse>).response?.data.message ??
          "An unexpected error occurred";
        onError?.(errorMessage);
      }
    },
    [bookId]
  );

  /**
   * Delete the chapter of a book
   * @returns {Promise<void>} a promise handling the delete request
   */
  const onDeleteChapter: (
    chapterId: string,
    {
      onDelete,
      onError,
    }: Omit<ResultHandlerProps, "onForceDelete" | "onUpdate">
  ) => Promise<void> = useCallback(
    async (chapterId, { onDelete, onError }) => {
      await api
        .delete(`/books/${bookId}/chapters/${chapterId}`)
        .then((response: AxiosResponse<SuccessResponse>) => {
          setChapters((prev) => {
            return prev.filter((c) => c.id !== chapterId);
          });
          onDelete(response.data.message);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          onError(
            error.response?.data.message ?? "An unexpected error occurred"
          );
        });
    },
    [bookId]
  );

  /**
   * Force delete the chapter of a book
   * @returns {Promise<void>} a promise handling the force delete request
   */
  const onForceDeleteChapter: (
    chapterId: string,
    {
      onForceDelete,
      onError,
    }: Omit<ResultHandlerProps, "onDelete" | "onUpdate">
  ) => Promise<void> = useCallback(
    async (chapterId, { onForceDelete, onError }) => {
      await api
        .delete(`/books/${bookId}/chapters/${chapterId}/force`)
        .then((response: AxiosResponse<SuccessResponse>) => {
          setChapters((prev) => {
            return prev.filter((c) => c.id !== chapterId);
          });
          onForceDelete(response.data.message);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          onError(
            error.response?.data.message ?? "An unexpected error occurred"
          );
        });
    },
    [bookId]
  );

  const onPublish: (
    chapterId: string,
    { status }: { status: ChapterStatus },
    {
      onUpdate,
      onError,
    }: Omit<ResultHandlerProps, "onForceDelete" | "onDelete">
  ) => Promise<void> = useCallback(
    async (chapterId, status, { onUpdate, onError }) => {
      await api
        .put(`/books/${bookId}/chapters/${chapterId}/publish`, status)
        .then((response: AxiosResponse<Chapter>) => {
          setChapters((prev) => {
            return prev.map((chapter) =>
              chapter.id === response.data.id ? response.data : chapter
            );
          });
          onUpdate(response.data);
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          onError(
            error.response?.data.message ?? "An unexpected error occurred"
          );
        });
    },
    [bookId]
  );
  /**
   * Initializes the chapters of the book
   * @returns {Chapter[]} Array of chapters
   */
  useEffect(() => {
    if (data?.content) {
      setChapters(data.content);
    }
  }, [data?.content]);

  return {
    chapters,
    loading,
    error,
    onUpdateChapter,
    onPublish,
    onDeleteChapter,
    onForceDeleteChapter,
    getChapterById,
  } as const;
}
