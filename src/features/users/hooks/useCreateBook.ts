import { useMutation } from "@tanstack/react-query";
import { createBook } from "../api/user-book.service";

export function useCreateBookMutation() {
  return useMutation({
    mutationFn: async (formData: FormData) => createBook(formData),
  });
}
