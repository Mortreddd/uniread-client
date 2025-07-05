import {useEffect, useState} from "react";
import {RequestState} from "@/types/Pagination.ts";
import {AuthorDetail} from "@/types/User.ts";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";

interface GetAuthorById {
    authorId: string | undefined
}
export default function useGetAuthorById({ authorId } : GetAuthorById) {
    const [state, setState] = useState<RequestState<AuthorDetail>>({
        data: null,
        error: null,
        loading: false
    })


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function getAuthorById() {
            setState({ ...state, loading : true });

            await api.get(`/authors/${authorId}`, { signal })
                .then((result : AxiosResponse<AuthorDetail>) => {
                    setState({error: null, loading: false, data: result.data})
                }).catch((error: AxiosError<ErrorResponse>) => {
                    setState({error: error.response?.data.message ?? "Something went wrong", data: null, loading: false})
                })
        }

        getAuthorById();
    }, [authorId]);


    return state;
}