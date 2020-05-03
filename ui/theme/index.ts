import { createMuiTheme } from "@material-ui/core";

export default (dark: boolean) =>
  createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
    },
  });

export const redTeamColor = "#8B0000";
export const blueTeamColor = "#00008B";
