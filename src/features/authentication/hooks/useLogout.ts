import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth.service";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
