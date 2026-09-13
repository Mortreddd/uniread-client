import api from "@/core/api/ApiService";

export const createBook: (formData: FormData) => Promise<void> = async (
  formData: FormData,
) => {
  return api.post("/books", formData);
};
