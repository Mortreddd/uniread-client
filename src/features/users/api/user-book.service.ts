import api from "@/core/api/ApiService";
import { UserBook, UserBookFilter } from "../types/UserBook";
import { Paginate } from "@/types/Pagination";

export const getUserBooks: (
  filter: UserBookFilter,
) => Promise<Paginate<UserBook[]>> = async (filter: UserBookFilter) => {
  const response = await api.get<Paginate<UserBook[]>>("/me/books", {
    params: filter,
  });

  return response.data;
};
