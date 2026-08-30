import api from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { avatar: File }) => {
      const formData = new FormData();
      formData.append("avatar", data.avatar);
      const res = await api.post<{ photoUrl: string; publicId: string }>(
        "/me/profile/avatar",
        formData,
      );
      return res.data;
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
