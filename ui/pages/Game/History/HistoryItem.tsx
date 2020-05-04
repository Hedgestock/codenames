import { Chip, Typography } from "@material-ui/core";
import * as React from "react";
import { IHistoryItem } from "../../../../shared/interfaces";
import { Store } from "../../../Store";
import { blueTeamColor, redTeamColor } from "../../../theme";
import PlayerChip from "../PlayerChip";

const HistoryItem = ({ player, action, card }: IHistoryItem) => {
  const { state } = React.useContext(Store);

  console.log("player", player);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        marginBottom: "5px",
        alignItems: "baseline",
      }}
    >
      {player ? <PlayerChip player={player} /> : null}
      <Typography>{state.langRes.history[action]}</Typography>
      {card ? (
        <Chip
          size="small"
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
