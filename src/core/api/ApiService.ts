import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

// Main instance with interceptors
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Clean instance for refresh ONLY (no interceptors attached)
const refreshApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Check if it's a 401 and not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (
        originalRequest.url?.includes("/authentication/logout") ||
        originalRequest.url?.includes("/authentication/refresh-token")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          // We call the 'refreshApi' instance so this call isn't intercepted
          refreshPromise = refreshApi.post("/auth/refresh-token");
        }

        // 3. Wait for the refresh call to complete (shared by all 401 requests)
        await refreshPromise;

        // 4. Reset flags
        isRefreshing = false;
        refreshPromise = null;

        // 5. Retry the original request (it will now use the new cookie)
        return api(originalRequest);
      } catch (refreshError) {
        // 6. Refresh failed (Refresh Token likely expired too)
        isRefreshing = false;
        refreshPromise = null;
        console.error("Session expired. Redirecting to login.");
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
