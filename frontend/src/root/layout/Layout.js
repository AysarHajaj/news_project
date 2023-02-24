import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import AppMain from "./AppMain";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar />
      <CssBaseline />
      <AppMain>
        <Outlet />
      </AppMain>
    </Box>
  );
}

export default Layout;
