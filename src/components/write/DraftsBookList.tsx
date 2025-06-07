import {BookStatus} from "@/types/Enums.ts";
import DraftBookItem from "@/components/write/DraftBookItem.tsx";
import api from "@/services/ApiService.ts";
import {AxiosResponse} from "axios";
import {SuccessResponse} from "@/types/Success.ts";
import {Book} from "@/types/Book.ts";
import {useEffect, useState} from "react";
import useGetUserBooks from "@/api/books/useGetUserBooks.ts";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {PaginateParams} from "@/types/Pagination.ts";
import LoadingCircle from "@/components/LoadingCirlce.tsx";
import {useToast} from "@/contexts/ToastContext.tsx";

export default function DraftsBookList() {
    const [{ pageNo, pageSize, query }] = useState<PaginateParams>({
        pageNo: 0,
        pageSize: 10,
        query: ""
    })
    const { user } = useAuth();
    const { data, loading } = useGetUserBooks({ userId: user?.id, pageNo, pageSize, query, status: BookStatus.DRAFT })
    const { showToast } = useToast();
    const [draftsBooks, setDraftsBooks] = useState<Book[]>([])
    const deleteBook = async (book: Book) => {
        await api.delete(`/books/${book.id}`)
            .then((response : AxiosResponse<SuccessResponse>) => {
                showToast(response.data.message, 'success')
                setDraftsBooks((prev) => {
                    return prev?.filter((b) => b.id !== book.id)
                })
        }).catch((error) => {
            console.error(error);
            })
    }

    useEffect(() => {
        if(data?.content) {
            setDraftsBooks(data.content)
        }
    }, [data]);

    return(
        <section className={"w-full min-h-px space-y-2"}>
            {loading && !data?.content ? (
                <div className={'w-full flex items-center justify-center h-full'}>
                    <LoadingCircle />
                </div>
            ) : (draftsBooks.length > 0 ? (
                draftsBooks?.map((book) => (
                <DraftBookItem book={book} key={book.id} onDelete={() => deleteBook(book)} />
                ))) : (

                        <div className={"w-full h-full flex items-center justify-center"}>
                        <h1 className={"text-xl font-sans text-gray-800 font-bold"}>
                            Empty draft books
                        </h1>
                    </div>
                )
            )}
        </section>
    )


}