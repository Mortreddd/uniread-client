import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../api/books.service";

export function useCreateBookMutation() {
  return useMutation({
    mutationFn: async (formData: FormData) => createBook(formData),
  });
}
