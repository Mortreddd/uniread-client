import { useQuery } from "@tanstack/react-query";
import { getUserMonitoring } from "../api/user.service";
import { UserMonitoringFilter } from "../types/UserTable";

export const useGetUserMonitoring = (params: UserMonitoringFilter) => {
  return useQuery({
    queryKey: ["monitorUsers", params],
    queryFn: () => getUserMonitoring(params),
    enabled: !!params,
    staleTime: 0,
  });
};
