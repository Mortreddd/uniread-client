import {Paginate, PaginateParams, RequestState} from "@/types/Pagination.ts";
import {useEffect, useState} from "react";
import {Follow} from "@/types/Follow.ts";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";


export default function useGetCurrentUserFollowers({ pageNo, pageSize, query } : PaginateParams) {
    const [state, setState] = useState<RequestState<Paginate<Follow[]>>>({
        data: null,
        error: null,
        loading: false
    })


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function getCurrentUserFollowers() {
            setState({...state, loading: true})
            await api.get('/users/me/followers', {
                params: {
                    pageNo,
                    pageSize,
                    query
                },
                signal
            }).then((response: AxiosResponse<Paginate<Follow[]>>)=> {
                setState({ data: response.data, loading: false, error: null });
            }).catch((error: AxiosError<ErrorResponse>) => {
                setState({ data: null, loading: false, error: error.response?.data.message ?? "Something went wrong" });
            });
        }


        getCurrentUserFollowers()
    }, [pageNo, pageSize, query]);


    return state;
}