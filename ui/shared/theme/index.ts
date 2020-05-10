import { createMuiTheme } from "@material-ui/core";

export default (dark: boolean) =>
  createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
    },
  });

export const redTeamColor = "#8B0000";
export const blueTeamColor = "#00008B";
export const blackCardColor = "#000";
export const whiteCardColor = "#FFF";
export const unrevealedCardBackgroundColor = "#888";
export const revealedCardColor = "#DDD";