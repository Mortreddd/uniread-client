import { useEffect, useState } from "react";
import {User} from "@/types/User.ts";
import {RequestState} from "@/types/Pagination.ts";
import api from "@/services/ApiService.ts";
import {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "@/types/Error.ts";

export default function useGetUserById(userId?: string) {
  const [state, setState] = useState<RequestState<User>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    async function getUserById() {
      setState({...state, loading : true})
      api.get(`/users/${userId}`)
          .then((response: AxiosResponse<User>) => {
            console.log(response.data)
            setState({loading: false, data: response.data, error : null})
          }).catch((error: AxiosError<ErrorResponse>) => {
            console.log(error);
            setState({loading: false, data: null, error : error?.response?.data.message ?? "Something went wrong"})
          })

    }


    getUserById();

    return () => {
      controller.abort("Cancelled")
    }
  }, [userId]);

  return state;
}
