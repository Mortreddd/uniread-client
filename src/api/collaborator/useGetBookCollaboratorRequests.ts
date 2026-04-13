import api from "@/core/api/ApiService.ts";
import { CollaboratorRequest } from "@/types/Collaborator";
import { ErrorResponse } from "@/types/Error";
import { Paginate, PaginateParams, RequestState } from "@/types/Pagination";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface GetBookCollaboratorRequestsProps extends PaginateParams {
  bookId: string;
}

export default function useGetBookCollaboratorRequests({
  bookId,
  pageNo,
  pageSize,
}: GetBookCollaboratorRequestsProps) {
  const [state, setState] = useState<
    RequestState<Paginate<CollaboratorRequest[]>>
  >({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getBookCollaboratorRequests() {
      await api
        .get(`/books/${bookId}/collaboration-requests`, {
          params: { pageNo, pageSize },
          signal,
        })
        .then((response: AxiosResponse<Paginate<CollaboratorRequest[]>>) => {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            data: null,
            loading: false,
            error:
              error.response?.data.message ||
              "Error getting collaborator requests",
          });
        });
    }

    getBookCollaboratorRequests();
  }, [bookId]);

  return state;
}
