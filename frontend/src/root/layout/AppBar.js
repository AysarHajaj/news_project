import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
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

function AppBar() {
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
