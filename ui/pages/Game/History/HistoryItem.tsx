import { Chip, Typography } from "@material-ui/core";
import * as React from "react";
import { IPlayer } from "../../../../shared/interfaces";
import { redTeamColor, blueTeamColor } from "../../../theme";
import { Store } from "../../../Store";

interface HistoryItemProps {
  player: IPlayer;
  action: string;
}

const HistoryItem = ({ player, action }: HistoryItemProps) => {
  const { state } = React.useContext(Store);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        marginBottom: "5px",
        alignItems: "baseline",
      }}
    >
      <Chip
        label={player.name}
        style={{
          backgroundColor:
            player.team === "red"
              ? redTeamColor
              : player.team === "blue"
              ? blueTeamColor
              : "",
        }}
      />
      <Typography>{state.langRes.history[action]}</Typography>
    </div>
  );
};

export default HistoryItem;
