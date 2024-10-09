import axiosInstance from "./axiosInstance";

const login = async (credentials) => {
  return axiosInstance.post("/user/login", credentials);
};

const register = async (userData) => {
  return axiosInstance.post("/user/register", userData);
};

const logout = async () => {
  return axiosInstance.post("/user/logout");
};

export { login, register, logout };
