import { Chip, useTheme } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import * as React from "react";
import { IPlayer } from "../../../shared/interfaces";
import { blueTeamColor, redTeamColor } from "../../theme";

interface PlayerChipProps {
  player: IPlayer;
  makeSpyMaster?: () => void;
  makeGameMaster?: () => void;
}

const iconStyle = { color: "#FFF" };

const PlayerChip = ({ player, makeSpyMaster }: PlayerChipProps) => {
  const theme = useTheme();

  return (
    <Chip
      label={player.name}
      style={{
        backgroundColor:
          player.team === "red"
            ? redTeamColor
            : player.team === "blue"
            ? blueTeamColor
            : "",
        color: "#FFF",
        marginRight: "5px",
        border: player.isAdmin ? "2px solid " + theme.palette.text.primary : "none",
      }}
      size="small"
      onDelete={makeSpyMaster ?? (() => null)}
      deleteIcon={
        player.isSpyMaster ? (
          <Visibility style={iconStyle} />
        ) : (
          <VisibilityOff style={iconStyle} />
        )
      }
    />
  );
};

export default PlayerChip;
