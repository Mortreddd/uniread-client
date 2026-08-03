import api from "@/core/api/ApiService";
import { UserProfileDetails } from "../types/UserProfile";
import { Paginate, PaginateParams } from "@/types/Pagination";
import { UserSearchPreview } from "../types/User";

export const getMyProfile: () => Promise<UserProfileDetails> = async () => {
  const res = await api.get("/me/profile");
  return res.data;
};

export const searchPublicUsers = async (
  filter: PaginateParams,
): Promise<Paginate<UserSearchPreview[]>> => {
  const res = await api.get<Paginate<UserSearchPreview[]>>("/users/search", {
    params: filter,
  });
  return res.data;
};
