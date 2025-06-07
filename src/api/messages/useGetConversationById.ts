import {useEffect, useState} from "react";
import {RequestState} from "@/types/Pagination.ts";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import { Conversation as ConversationType } from "@/types/Message";
import {ErrorResponse} from "@/types/Error.ts";

interface GetConversationByIdProps {
    conversationId: string | undefined;
    userId: string | undefined;
}

export default function useGetConversationById({ conversationId, userId } : GetConversationByIdProps) {

    const [state, setState] = useState<RequestState<ConversationType>>({
        loading: false,
        error: null,
        data: null
    })

    useEffect(() => {
        async function getConversationById() {
            setState({ ...state, loading: true })
            await api.get(`/users/${userId}/conversations/${conversationId}`)
                .then((response : AxiosResponse<ConversationType>)=> {
                    setState({ data: response.data, error: null, loading: false });
                }).catch((error: AxiosError<ErrorResponse>) => {
                    setState({ data: null, error: error.response?.data.message ?? "Unable to get the conversation", loading: false });
                });
        }

        getConversationById();

    }, [conversationId]);

    return state;
}