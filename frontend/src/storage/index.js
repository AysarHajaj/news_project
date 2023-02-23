import KEYS from "./keys";

const getUser = () => JSON.parse(localStorage.getItem(KEYS.USER) || "{}");

const getToken = () => localStorage.getItem(KEYS.TOKEN);

const setUser = (user) => localStorage.setItem(KEYS.USER, JSON.stringify(user));

const setToken = (token) => localStorage.setItem(KEYS.TOKEN, token);

const storage = {
  getUser,
  getToken,
  setUser,
  setToken,
};

export default storage;
