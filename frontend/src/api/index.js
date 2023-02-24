import api from "./axios";

const login = (data) => api.post(`/login`, data);
const register = (data) => api.post(`/register`, data);
const updateProfile = (data) => api.put(`/profile`, data);
const getSettingsOptions = () => api.get(`/settings/options`);

const apis = {
  login,
  register,
  updateProfile,
  getSettingsOptions,
};

export default apis;
