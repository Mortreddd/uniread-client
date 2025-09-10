// import {Book} from "@/types/Book";
import {useCallback} from "react";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {SuccessResponse} from "@/types/Success.ts";
import {ErrorResponse} from "@/types/Error.ts";

interface ResultHandlerProps {
    onForceDelete: (message: string) => void;
    onDelete: (message: string) => void;
    onError: (message: string) => void;
}

export default function useBook() {

    const onDeleteBook: (
        bookId: string,
        {
            onDelete,
            onError,
        }: Omit<ResultHandlerProps, "onForceDelete" | "onUpdate">
    ) => Promise<void> = useCallback(
        async (bookId, { onDelete, onError }) => {
            await api
                .delete(`/books/${bookId}`)
                .then((response: AxiosResponse<SuccessResponse>) => {
                    // setBooks((prev) => {
                    //     return prev.filter((b) => b.id !== bookId);
                    // });
                    onDelete(response.data.message);
                })
                .catch((error: AxiosError<ErrorResponse>) => {
                    onError(
                        error.response?.data.message ?? "An unexpected error occurred"
                    );
                });
        },
        []
    );

    const onForceDeleteBook: (
        bookId: string,
        {
            onForceDelete,
            onError,
        }: Omit<ResultHandlerProps, "onDelete" | "onUpdate">
    ) => Promise<void> = useCallback(
        async (bookId, { onForceDelete, onError }) => {
            await api
                .delete(`/books/${bookId}/force`)
                .then((response: AxiosResponse<SuccessResponse>) => {
                    onForceDelete(response.data.message);
                })
                .catch((error: AxiosError<ErrorResponse>) => {
                    onError(
                        error.response?.data.message ?? "An unexpected error occurred"
                    );
                });
        },
        []
    );


    return { onDeleteBook, onForceDeleteBook } as const;
}
