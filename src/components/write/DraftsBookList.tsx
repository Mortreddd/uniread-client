import {useUserStories} from "@/components/write/MyStoriesSection.tsx";
import {BookStatus} from "@/types/Enums.ts";
import DraftBookItem from "@/components/write/DraftBookItem.tsx";
import api from "@/services/ApiService.ts";
import {AxiosResponse} from "axios";
import {SuccessResponse} from "@/types/Success.ts";
import {useAlert} from "@/contexts/AlertContext.tsx";
import {Book} from "@/types/Book.ts";
import {useEffect, useState} from "react";

export default function DraftsBookList() {
    const { books } = useUserStories();
    const { showAlert } = useAlert();
    const [draftsBooks, setDraftsBooks] = useState<Book[]>(books)
    const deleteBook = async (book: Book) => {
        await api.delete(`/books/${book.id}`)
            .then((response : AxiosResponse<SuccessResponse>) => {
                showAlert(response.data.message, 'success')
                setDraftsBooks((prev) => {
                    return prev.filter((b) => b.status === BookStatus.DRAFT && b.id !== book.id)
                })
        }).catch((error) => {
            console.error(error);
            })
    }

    useEffect(() => {
        setDraftsBooks((prev) => {
            return prev.filter((book) => book.status === BookStatus.DRAFT)
        } )
    }, [books]);
    return(
        <section className={"w-full min-h-[1px] space-y-2"}>
            {draftsBooks.length > 0 ? (
                draftsBooks.map((book) => (
            <DraftBookItem book={book} key={book.id} onDelete={() => deleteBook(book)} />
                ))) : (
                    <div className={"w-full h-full flex items-center justify-center"}>
                        <h1 className={"text-xl font-sans text-gray-800 font-bold"}>
                            Empty draft books
                        </h1>
                    </div>
                )}
        </section>
    )


}