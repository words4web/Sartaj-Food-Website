import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { store } from "../store";
import { clearAuth, setAccessToken } from "../store/authSlice";
import { API_ROUTES } from "@/constants/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sartajfoods.com";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (!refreshToken) {
          store.dispatch(clearAuth());
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${API_BASE_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          {
            timeout: 30000,
          },
        );

        const { accessToken } = response.data;

        store.dispatch(setAccessToken(accessToken));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearAuth());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
