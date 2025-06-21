import axios, { InternalAxiosRequestConfig } from "axios";

const API_URL: string = `${import.meta.env.VITE_API_URL as string}/api/v1`;

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken: string | null = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log(accessToken);
  return config;
};

const errorInterceptor = async (error: any) => {
  return Promise.reject(error);
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(authInterceptor, errorInterceptor);

export default api;
