import api from "@/services/ApiService";
import { ErrorResponse } from "@/types/Error";
import { RequestState } from "@/types/Pagination";
import { UserDashboard } from "@/types/User";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useGetUserDashboard() {
  const [state, setState] = useState<RequestState<UserDashboard>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getUserDashboard() {
      setState({ loading: true, error: null, data: null });
      await api
        .get("/profile/dashboard", { signal })
        .then((response: AxiosResponse<UserDashboard>) => {
          console.log("User Dashboard Data:", response.data);
          setState({
            loading: false,
            error: null,
            data: response.data,
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            loading: false,
            error: error.message,
            data: null,
          });
        });
    }

    getUserDashboard();
  }, []);
  return state;
}
