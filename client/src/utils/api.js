import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://herbalsync-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error)
);

export default api;
