import { createMuiTheme } from "@material-ui/core";

export default (dark: boolean) =>
  createMuiTheme({
    palette: {
      // primary: { main: "#F00", light: "#0F0", dark: "#00F" },
      // secondary: { main: "#0FF", light: "#F0F", dark: "#FF0" },
      type: dark ? "dark" : "light",
    },
  });
