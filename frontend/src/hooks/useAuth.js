import { useSelector } from "react-redux";
import { selectLogin } from "../reducers/authSlice";

export const useAuth = () => {
  const { user, token, isLoading, error } = useSelector(selectLogin);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user?.id,
  };
};
