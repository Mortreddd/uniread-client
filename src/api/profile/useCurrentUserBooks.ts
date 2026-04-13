import {BookDetail, BookParams} from "@/features/books/types/Book.ts";
import {useEffect, useState} from "react";
import {Paginate, RequestState} from "@/types/Pagination.ts";
import api from "@/core/api/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";


type ImmutableBookProps = Omit<BookParams, 'status' | 'genres'>

interface GetCurrentUserBooksProps extends ImmutableBookProps {
    category: string
}

export default function useCurrentUserBooks({ pageNo, pageSize, category, query, sortBy, orderBy, startDate, endDate, deletedAt } : GetCurrentUserBooksProps) {

    const [state, setState] = useState<RequestState<Paginate<BookDetail[]>>>({
        data: null,
        error: null,
        loading: false
    })

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        async function getCurrentUserBooks() {
            setState({ ...state, loading: true })
            await api.get('/profile/stories', {
                params: {
                    pageNo,
                    pageSize,
                    category,
                    query,
                    sortBy,
                    orderBy,
                    startDate,
                },
                signal
            }).then((response : AxiosResponse<Paginate<BookDetail[]>>)=> {
                console.log(response);
                setState({ loading : false, data: response.data, error: null })
            }).catch((error: AxiosError<ErrorResponse>) => {
                setState({ loading : false, data: null, error: error.response?.data.message ?? "Something went wrong"})
            })
        }

        getCurrentUserBooks();

    }, [pageNo, pageSize, category, query, sortBy, orderBy, startDate, endDate, deletedAt]);

    return state;
}
