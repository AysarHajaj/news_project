import api from "./axios";

const login = (data) => api.post(`/login`, data);
const register = (data) => api.post(`/register`, data);

const apis = {
  login,
  register,
};

export default apis;
