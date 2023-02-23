import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontSize: 12,
  },

  palette: {
    primary: {
      main: "#5f4da0",
      contrastText: "#fff",
    },

    text: {
      primary: "#2B3238",
    },
  },

  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "30px",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        inputProps: {
          style: {
            height: "1em",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          textTransform: "capitalize",
          fontWeight: "bold",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },

    MuiInputBase: {
      defaultProps: {
        inputProps: {
          style: {
            height: "1em",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          height: "1em",
        },
      },
    },

    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "13.32px 14px",
        },
      },
    },
  },
});

export default theme;
