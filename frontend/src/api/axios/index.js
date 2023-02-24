import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const WithAxios = ({ children }) => {
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        if (isAuthenticated) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [isAuthenticated, token]);

  return children;
};

export default api;
