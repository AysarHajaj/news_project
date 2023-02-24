import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ROUTES from "../../routes/paths";

function NavLinks() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const links = useMemo(
    () => [
      {
        to: ROUTES.HOME,
        icon: <HomeIcon />,
        label: "Home",
        hidden: !isAuthenticated,
      },
      {
        to: ROUTES.LOGIN,
        icon: <PersonIcon />,
        label: "Sign In",
        hidden: !!isAuthenticated,
      },
      {
        to: ROUTES.REGISTER,
        icon: <PersonAddIcon />,
        label: "Register",
        hidden: !!isAuthenticated,
      },
      {
        to: ROUTES.PROFILE,
        icon: <ManageAccountsIcon />,
        label: "Profile",
        hidden: !isAuthenticated,
      },
      {
        to: ROUTES.SETTINGS,
        icon: <SettingsIcon />,
        label: "Settings",
        hidden: !isAuthenticated,
      },
    ],
    [isAuthenticated]
  );

  return (
    <nav className="nav-links">
      {links.map((item) => (
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "active" : ""} nav-link-item`
          }
          key={item.label}
          hidden={item.hidden}
          to={item.to}
        >
          {item.icon}
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            {item.label}
          </Typography>
        </NavLink>
      ))}
      <NavLink
        to={ROUTES.LOGOUT}
        className="nav-link-item"
        hidden={!isAuthenticated}
        onClick={() => {
          navigate(ROUTES.LOGIN.path);
        }}
      >
        <LogoutIcon />
        <Typography sx={{ display: { xs: "none", sm: "block" } }}>
          Logout
        </Typography>
      </NavLink>
    </nav>
  );
}

export default NavLinks;
