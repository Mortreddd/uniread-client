import api from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfileDetails } from "../types/UserProfile";

type UpdateProfileRequest = Omit<
  UserProfileDetails,
  "coverPhoto" | "avatarPhoto"
>;

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const res = await api.put<UserProfileDetails>("/me/profile", data);
      return res.data;
    },
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
};
