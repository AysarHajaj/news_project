import * as React from "react";
import { styled } from "@mui/material/styles";

const Main = styled("main", { shouldForwardProp: () => true })(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: "64px",
}));

function AppMain(props) {
  return <Main>{props.children}</Main>;
}

export default AppMain;
