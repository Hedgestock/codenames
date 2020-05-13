import * as React from "react";
import { ICard, EGameState } from "../../../shared";
import { Store } from "../../Store";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";
import {
  blueTeamColor,
  redTeamColor,
  whiteCardColor,
  blackCardColor,
  unrevealedCardBackgroundColor,
  revealedCardColor,
} from "../../shared/theme";
import GameCard from "./GameCard";
import { Typography } from "@material-ui/core";

interface BoardProps extends ISocketConnectedProps {
  gameState: EGameState;
}

const Board = ({ gameState, socket }: BoardProps) => {
  const { state } = React.useContext(Store);

  const blackRevealed = {
    backgroundColor: blackCardColor,
    color: revealedCardColor,
  };
  const blueRevealed = {
    backgroundColor: blueTeamColor,
    color: revealedCardColor,
  };
  const redRevealed = {
    backgroundColor: redTeamColor,
    color: revealedCardColor,
  };
  const whiteRevealed = { backgroundColor: whiteCardColor, color: "#000" };
  const blackUnrevealedSpy = {
    backgroundColor: "#333",
    color: revealedCardColor,
  };
  const blueUnrevealedSpy = {
    backgroundColor: unrevealedCardBackgroundColor,
    color: blueTeamColor,
  };
  const redUnrevealedSpy = {
    backgroundColor: unrevealedCardBackgroundColor,
    color: redTeamColor,
  };
  const whiteUnrevealedSpy = {
    backgroundColor: unrevealedCardBackgroundColor,
    color: whiteCardColor,
  };
  const UnrevealedPlayer = {
    backgroundColor: unrevealedCardBackgroundColor,
    color: "#000",
  };

  const [board, setBoard] = React.useState([]);

  React.useEffect(() => {
    if (socket) {
      socket.on("boardUpdate", (boardObject) => {
        setBoard(boardObject);
      });

      socket.on("boardUpdate", (boardObject) => {
        setBoard(boardObject);
      });
    }
  }, [socket]);

  function getStyle(card: ICard) {
    if (!card.color) {
      return UnrevealedPlayer;
    }
    if (card.revealed) {
      switch (card.color) {
        case "blue":
          return blueRevealed;
        case "red":
          return redRevealed;
        case "black":
          return blackRevealed;
        default:
          return whiteRevealed;
      }
    }
    switch (card.color) {
      case "blue":
        return blueUnrevealedSpy;
      case "red":
        return redUnrevealedSpy;
      case "black":
        return blackUnrevealedSpy;
      default:
        return whiteUnrevealedSpy;
    }
  }

  return (
    <>
      {gameState === EGameState.blueTeamWon ? (
        <Typography variant="h3" style={{color: blueTeamColor}}>{state.langRes.game.blueTeamWon}</Typography>
      ) : gameState === EGameState.redTeamWon ? (
        <Typography variant="h3" style={{color: redTeamColor}}>{state.langRes.game.blueTeamWon}</Typography>
      ) : null}
      <div className="game-board">
        {board.map((c, i) => (
          <GameCard
            key={i}
            column={(i % 5) + 1}
            row={Math.floor(i / 5 + 1)}
            style={getStyle(c)}
            // votes={Math.floor(Math.random() * 5)}
            onClick={() => socket.emit("tryReveal", i)}
          >
            {c.word}
          </GameCard>
        ))}
      </div>
    </>
  );
};

export default Board;
