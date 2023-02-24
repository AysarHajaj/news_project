import api from "./axios";

const login = (data) => api.post(`/login`, data);
const register = (data) => api.post(`/register`, data);
const updateProfile = (data) => api.put(`/profile`, data);

const apis = {
  login,
  register,
  updateProfile,
};

export default apis;
