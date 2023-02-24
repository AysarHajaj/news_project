import React from "react";
import paths from "./paths";

const routes = {
  HOME: {
    path: paths.HOME,
    ELEMENT: React.lazy(() => import("../features/Home")),
  },
  LOGIN: {
    path: paths.LOGIN,
  },
  REGISTER: {
    path: paths.REGISTER,
  },
  PROFILE: {
    path: paths.PROFILE,
    ELEMENT: React.lazy(() => import("../features/Profile")),
  },
  SETTINGS: {
    path: paths.SETTINGS,
    ELEMENT: React.lazy(() => import("../features/Settings")),
  },
};

export default routes;
