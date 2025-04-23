import axios, { InternalAxiosRequestConfig } from "axios";

const API_URL: string = import.meta.env.VITE_API_URL as string;

const unauthorizedUrl: string[] = [
  "/books",
  "/books/:bookId",
  "/auth/login",
  "/auth/register",
  "/users",
  "/auth/forgot-password",
];

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  if (unauthorizedUrl.includes(config.url as string)) {
    return config;
  }

  const accessToken: string | null = localStorage.getItem("accessToken");
  console.log("Access Token: ", accessToken);
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
};

const errorInterceptor = async (error: any) => {
  return Promise.reject(error);
};

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(authInterceptor, errorInterceptor);

export default api;
