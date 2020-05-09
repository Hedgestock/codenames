import { Chip, useTheme } from "@material-ui/core";
import { Visibility, VisibilityOff, Settings } from "@material-ui/icons";
import * as React from "react";
import { IPlayer, EPlayerStatus } from "../../../shared/interfaces";
import { blueTeamColor, redTeamColor } from "../../theme";

interface PlayerChipProps {
  player: IPlayer;
  makeSpyMaster?: () => void;
  makeGameMaster?: () => void;
}

const iconStyle = { color: "#FFF" };

const PlayerChip = ({ player, makeSpyMaster }: PlayerChipProps) => {
  const theme = useTheme();

  function getColor() {
    let color = player.team === "red" ? redTeamColor : blueTeamColor;
    if (player.status == EPlayerStatus.DISCONNECTED) {
      color += "44";
    }
    console.log(color);
    return color;
  }

  return (
    <Chip
      label={player.name}
      style={{
        backgroundColor: getColor(),
        color: "#FFF",
        marginRight: "5px",
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
      icon={player.isGameMaster ? <Settings style={iconStyle} /> : null}
    />
  );
};

export default PlayerChip;
