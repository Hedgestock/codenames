import * as React from "react";
import { IPlayer } from "../../../shared/interfaces";
// import { Chip } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
// import { Visibility, VisibilityOff } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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
    onDelete={makeSpyMaster ?? (() => null)}
    deleteIcon={player.isSpyMaster ? <Visibility /> : <VisibilityOff />}
  />
);

export default PlayerChip;
