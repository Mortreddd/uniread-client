import api from "@/core/api/ApiService";
import { UserBook, UserBookFilter } from "../types/UserBook";
import { Paginate } from "@/shared/types/Pagination";

export const getUserBooks: (
  filter: UserBookFilter,
) => Promise<Paginate<UserBook[]>> = async (filter: UserBookFilter) => {
  const response = await api.get<Paginate<UserBook[]>>("/me/books", {
    params: filter,
  });

  return response.data;
};

export const createBook: (formData: FormData) => Promise<void> = async (
  formData: FormData,
) => {
  return api.post("/books", formData);
};
