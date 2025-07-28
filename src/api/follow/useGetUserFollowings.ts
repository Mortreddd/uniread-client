import {Paginate, PaginateParams, RequestState} from "@/types/Pagination.ts";
import {useEffect, useState} from "react";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";
import {AuthorDetail} from "@/types/User.ts";

interface GetUserFollowingsProps extends PaginateParams {
    userId: string | undefined;
}

export default function useGetUserFollowings({ userId, pageNo, pageSize, query, sortBy, orderBy, startDate, endDate } : GetUserFollowingsProps ) {
    const [state, setState] = useState<RequestState<Paginate<AuthorDetail[]>>>({
        data: null,
        error: null,
        loading: false
    })

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal
        async function getCurrentUserFollowings() {
            setState({ ...state, loading : true })
            await api.get(`/users/${userId}/follow/followings`,
                {
                    params: {
                        pageNo, pageSize, query, sortBy, orderBy, startDate, endDate
                    },
                    signal
                }).then((response: AxiosResponse<Paginate<AuthorDetail[]>>) => {
                    setState({ loading: false, data: response.data, error: null })
            }).catch((error: AxiosError<ErrorResponse>) => {
                setState({ loading : false, data: null, error: error.response?.data.message ?? "An error occurred"})
            })
        }

        getCurrentUserFollowings()
    }, [userId, pageNo, pageSize, query, sortBy, orderBy, startDate, endDate]);


    return state;
}