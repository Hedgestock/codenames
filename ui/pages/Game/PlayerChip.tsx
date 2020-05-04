import * as React from "react";
import { IPlayer } from "../../../shared/interfaces";
import { Chip } from "@material-ui/core";
import { Visibility, VisibilityOff, NoEncryption } from "@material-ui/icons";
import { redTeamColor, blueTeamColor } from "../../theme";

interface PlayerChipProps {
  player: IPlayer;
  makeSpyMaster?: () => void;
  makeGameMaster?: () => void;
}

const PlayerChip = ({ player, makeSpyMaster }: PlayerChipProps) => (
  <Chip
    label={player.name}
    style={{
      backgroundColor:
        player.team === "red"
          ? redTeamColor
          : player.team === "blue"
          ? blueTeamColor
          : "",
      color: "#fff",
      marginRight: "5px",
      border: player.isAdmin ? "1px solid #FFF" : "none",
    }}
    size="small"
    onDelete={makeSpyMaster}
    deleteIcon={player.isSpyMaster ? <Visibility /> : <VisibilityOff />}
  />
);

export default PlayerChip;
