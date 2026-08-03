import api from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { url: string; publicId: string }) => {
      const res = await api.patch("/me/profile/avatar", {
        avatarUrl: data.url,
        avatarPublicId: data.publicId,
      });
      return res.data;
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
