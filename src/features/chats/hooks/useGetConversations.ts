import { PaginateParams } from "@/types/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../api/chat.service";

export const useGetConversations = (params: PaginateParams) => {
  return useQuery({
    queryKey: ["conversations", params],
    queryFn: () => getConversations(params),
    enabled: !!params,
  });
};
