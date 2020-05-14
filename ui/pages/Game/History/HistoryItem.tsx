import { Chip, Typography } from "@material-ui/core";
import * as React from "react";
import { IHistoryItem } from "../../../../shared";
import { Store } from "../../../Store";
import {
  blueTeamColor,
  redTeamColor,
  blackCardColor,
  whiteCardColor,
} from "../../../shared/theme";
import PlayerChip from "../PlayerChip";

const HistoryItem = ({
  player,
  wordNumber,
  action,
  hint,
  card,
}: IHistoryItem) => {
  const { state } = React.useContext(Store);

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "5px",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {player ? (
        <PlayerChip player={player} style={{ marginRight: "5px" }} />
      ) : null}

      <Typography>
        {wordNumber && hint
          ? `${state.langRes.guess.in} ${wordNumber} ${state.langRes.guess.word}: ${hint}.`
          : null}
        {state.langRes.history[action]}
      </Typography>
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
                : card.color === "black"
                ? blackCardColor
                : whiteCardColor,
            marginLeft: "5px",
          }}
        />
      ) : null}
    </div>
  );
};

export default HistoryItem;
