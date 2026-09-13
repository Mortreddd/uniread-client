import api from "@/core/api/ApiService";
import { AuthUser, LoginForm, LoginResponse } from "@/types/Auth";
import { RegisterFormProps, VerifyEmailForm } from "../types/Auth";

export const login = async (data: LoginForm) => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterFormProps) => {
  await api.post("/auth/register", data);
};

export const getMe: () => Promise<AuthUser> = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const verifyEmail = async (token: string) => {
  await api.post("/auth/verify-email", { token });
};

export const verifyAccount = async (verifyEmail: VerifyEmailForm) => {
  await api.post("/auth/verify-account", verifyEmail);
};

export const forgotPassword = async (forgotPasswordForm: {
  usernameOrEmail: string;
}) => {
  await api.post("/auth/forgot-password", forgotPasswordForm);
};
