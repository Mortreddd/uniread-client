import { Paginate } from "@/types/Pagination";
import { GenreDetail, GenreTableFilter } from "../types/Genre";
import api from "@/core/api/ApiService";

export const getGenreDetails: (
  params: GenreTableFilter,
) => Promise<Paginate<GenreDetail[]>> = async ({ ...params }) => {
  const response = await api.get<Paginate<GenreDetail[]>>("/admin/genres", {
    params,
  });

  return response.data;
};

export const createGenre = async (newGenre: {
  name: string;
  description?: string;
}) => {
  try {
    const response = await api.post<GenreDetail>("/admin/genres", newGenre);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateGenre = async (genre: {
  id: string;
  name: string;
  description?: string;
}) => {
  const payload = { name: genre.name, description: genre.description };
  try {
    const response = await api.put<GenreDetail>(
      `/admin/genres/${genre.id}`,
      payload,
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
