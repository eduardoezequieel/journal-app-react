import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#2E294E",
    },
    secondary: {
      main: "#BE97C6",
    },
    error: {
      main: red.A400,
    },
    fairy: {
      main: "#EFBCD5",
    },
    amethist: {
      main: "#8661C1",
    },
    background: {
      main: "#ffffff",
    },
    grayish: {
      main: "#e0e0e0",
    },
  },
});
