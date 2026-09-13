import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth.service";
import { ForgotPasswordFormProps } from "../types/Auth";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (forgotPasswordForm: ForgotPasswordFormProps) =>
      forgotPassword(forgotPasswordForm),
  });
};
