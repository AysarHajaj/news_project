import api from "./axios";

const login = (data) => api.post(`/login`, data);
const register = (data) => api.post(`/register`, data);
const updateProfile = (data) => api.put(`/profile`, data);
const getSettingsOptions = () => api.get(`/settings/options`);
const updateSettings = (id, data) => api.put(`/settings/${id}`, data);
const logout = () => api.get(`/logout`);
const getData = (data) => api.post(`/get-data`, data);

const apis = {
  login,
  register,
  updateProfile,
  getSettingsOptions,
  updateSettings,
  logout,
  getData,
};

export default apis;
