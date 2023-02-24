import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, logout as _logout } from "../reducers/authSlice";

export const useAuth = () => {
  const { user, token, isLoading, error } = useSelector(selectLogin);

  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(_logout());
  }, [dispatch]);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user?.id,
    logout,
  };
};
