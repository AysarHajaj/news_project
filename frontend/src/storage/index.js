import KEYS from "./keys";

const getUser = () => JSON.parse(localStorage.getItem(KEYS.USER) || "{}");

const getToken = () => localStorage.getItem(KEYS.TOKEN);

const setUser = (user) => localStorage.setItem(KEYS.USER, JSON.stringify(user));

const setToken = (token) => localStorage.setItem(KEYS.TOKEN, token);

const clearUser = () => localStorage.removeItem(KEYS.USER);

const clearToken = () => localStorage.removeItem(KEYS.TOKEN);

const storage = {
  getUser,
  getToken,
  setUser,
  setToken,
  clearUser,
  clearToken,
};

export default storage;
