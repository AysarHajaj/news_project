import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import paths from "./paths";

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated)
    return <Navigate to={paths.LOGIN} state={{ from: location }} replace />;

  return <Outlet />;
}

export default RequireAuth;
