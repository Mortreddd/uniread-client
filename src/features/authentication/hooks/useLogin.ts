// features/auth/hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth.service";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
