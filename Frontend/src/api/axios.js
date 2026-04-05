import axios from "axios";

// create axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// interceptor to attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
