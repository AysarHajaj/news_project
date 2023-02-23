import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectLogin } from "../../reducers/authSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const WithAxios = ({ children }) => {
  const { token } = useSelector(selectLogin);

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [token]);

  return children;
};

export default api;
