import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { RequestState } from "@/types/Pagination";
import { User } from "@/types/User";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetUserByUsername(username: string | undefined) {
  const [state, setState] = useState<RequestState<User>>({
    data: null,
    error: null,
    loading: false,
  });
  console.log(username);

  useEffect(() => {
    setState({ loading: true, error: null, data: null });
    async function getUserByUsername() {
      api
        .get(`/authors/profile`, {
          params: { username },
        })
        .then((response: AxiosResponse<User>) => {
          console.log(response);
          setState({ data: response.data, error: null, loading: false });
        })
        .catch((error: AxiosError<ErrorResponse>) =>
          setState({
            loading: false,
            data: null,
            error: error.response?.data.message ?? "Something went wrong",
          })
        );
    }

    getUserByUsername();
  }, [username]);

  return state;
}
