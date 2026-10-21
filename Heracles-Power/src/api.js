import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hp-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const loggingIn = url.includes("/auth/login") || url.includes("/auth/signup");
    if (error.response?.status === 401 && !loggingIn) {
      localStorage.removeItem("hp-token");
      window.dispatchEvent(new Event("hp-logout"));
    }
    return Promise.reject(error);
  },
);

export function apiError(error, fallback) {
  return error?.response?.data?.message || fallback;
}

export default api;
