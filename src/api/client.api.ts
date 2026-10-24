// src/api/client.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // hardcoded for now, move to .env later

// Create an Axios instance with the base URL and default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ← tells axios: "include cookies on every request"
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = apiClient.post("/auth/refresh").finally(() => {
          isRefreshing = false;
        });
      }

      try {
        await refreshPromise;
        return apiClient(originalRequest);
      } catch {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
