import api from "./axios";

const login = (data) => api.post(`/login`, data);

const apis = {
  login,
};

export default apis;
