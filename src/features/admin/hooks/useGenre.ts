import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createGenre,
  getGenreDetails,
  updateGenre,
} from "../api/genre.service";
import { GenreTableFilter } from "../types/Genre";

export const useGetGenreDetails = (params: GenreTableFilter) => {
  return useQuery({
    queryKey: ["genreDetails", params],
    queryFn: () => getGenreDetails(params),
    enabled: !!params,
    staleTime: 0,
  });
};

export const useCreateGenreMutation = () => {
  return useMutation({
    mutationFn: (newGenre: { name: string; description?: string }) =>
      createGenre(newGenre),
  });
};

export const useUpdateGenreMutation = () => {
  return useMutation({
    mutationFn: (genre: { id: string; name: string; description?: string }) =>
      updateGenre(genre),
  });
};
