import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import "./style.scss";

const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const settings = {
  PROFILE: {
    label: "Profile",
    icon: <PersonIcon />,
    to: "/settings/profile",
  },
  LOGOUT: {
    label: "Logout",
    icon: <LogoutRoundedIcon />,
    to: "/logout",
  },
};

function AppBar() {
  const { user } = useAuth();
  const logout = () => console.log("ahmad");

  return (
    <AppBarStyle position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex" sx={{ flexGrow: 0 }}>
          <NavLinks />
        </Box>
      </Toolbar>
    </AppBarStyle>
  );
}

export default AppBar;
