// src/api/axios.js
import axios from "axios";

// Tạo một instance của axios
const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Thêm interceptor để tự động gắn JWT vào request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
