import { Paginate } from "@/types/Pagination";
import { UserMonitoringFilter, UserTableDetail } from "../types/UserTable";
import api from "@/core/api/ApiService";

interface GetUserMonitoringProps extends UserMonitoringFilter {}

export const getUserMonitoring: (
  params: GetUserMonitoringProps,
) => Promise<Paginate<UserTableDetail[]>> = async ({ ...params }) => {
  const response = await api.get<Paginate<UserTableDetail[]>>("/admin/users", {
    params,
  });

  return response.data;
};
