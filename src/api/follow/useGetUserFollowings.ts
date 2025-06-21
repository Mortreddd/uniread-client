import {Paginate, PaginateParams, RequestState} from "@/types/Pagination.ts";
import {useEffect, useState} from "react";
import {Follow} from "@/types/Follow.ts";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";

interface GetUserFollowingsProps extends PaginateParams {
    userId: string | undefined;
}

export default function useGetUserFollowings({ userId, pageNo, pageSize, query, status, sortBy, orderBy, startDate, endDate } : GetUserFollowingsProps ) {
    const [state, setState] = useState<RequestState<Paginate<Follow[]>>>({
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
                        pageNo, pageSize, query, status, sortBy, orderBy, startDate, endDate
                    },
                    signal
                }).then((response: AxiosResponse<Paginate<Follow[]>>) => {
                    setState({ loading: false, data: response.data, error: null })
            }).catch((error: AxiosError<ErrorResponse>) => {
                setState({ loading : false, data: null, error: error.response?.data.message ?? "An error occurred"})
            })
        }

        getCurrentUserFollowings()
    }, [userId, pageNo, pageSize, query, status, sortBy, orderBy, startDate, endDate]);


    return state;
}