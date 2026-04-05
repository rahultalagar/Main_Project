import API from "../api/axios";

// 🔐 Login API
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// 📝 Register API
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};