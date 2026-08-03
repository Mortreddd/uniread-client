import { useQuery } from "@tanstack/react-query";
import { searchPublicUsers } from "../api/user-profile.service";
import { PaginateParams } from "@/types/Pagination";

export const useSearchPublicUsers = (filter: PaginateParams) => {
  return useQuery({
    queryKey: ["searchPublicUsers", filter],
    queryFn: () => searchPublicUsers(filter),
    enabled: !!filter.query?.trim(),
  });
};
