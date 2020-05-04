import { Chip, Typography } from "@material-ui/core";
import * as React from "react";
import { IHistoryItem } from "../../../../shared/interfaces";
import { Store } from "../../../Store";
import { blueTeamColor, redTeamColor } from "../../../theme";

const HistoryItem = ({ player, action, card }: IHistoryItem) => {
  const { state } = React.useContext(Store);

  if (player) {
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        marginBottom: "5px",
        alignItems: "baseline",
      }}
    >
      {player ? (
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
          }}
        />
      ) : null}
      <Typography>{state.langRes.history[action]}</Typography>
      {card ? (
        <Chip
          label={card.word}
          style={{
            color:
              card.color === "red"
                ? redTeamColor
                : card.color === "blue"
                ? blueTeamColor
                : "",
            marginLeft: "5px",
          }}
        />
      ) : null}
    </div>
  );
};

export default HistoryItem;
