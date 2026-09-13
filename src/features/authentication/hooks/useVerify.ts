import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "../api/auth.service";
import { VerifyEmailForm } from "../types/Auth";

export const useVerify = () => {
  return useMutation({
    mutationFn: (verifyEmail: VerifyEmailForm) => verifyAccount(verifyEmail),
  });
};
