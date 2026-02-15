import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes("/auth/logout")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if this is a refresh token request itself
      if (originalRequest.url?.includes("/auth/refresh-token")) {
        window.location.href = "/";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = api
            .post("/auth/refresh-token")
            .then(() => {
              console.log("Token refreshed successfully");
            })
            .catch((refreshError) => {
              console.log("Session has expired. Please log in again.");
              // Clear any remaining cookies
              document.cookie.split(";").forEach((c) => {
                document.cookie = c
                  .replace(/^ +/, "")
                  .replace(
                    /=.*/,
                    `=;expires=${new Date().toUTCString()};path=/`,
                  );
              });
              window.location.href = "/";
              throw refreshError;
            })
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }
        await refreshPromise;
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
