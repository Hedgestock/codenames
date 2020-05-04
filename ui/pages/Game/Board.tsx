import * as React from "react";
import { ICard, SocketConnectedProps } from "../../../shared/interfaces";
import { Store } from "../../Store";
import { blueTeamColor, redTeamColor } from "../../theme";
import GameCard from "./GameCard";

const Board = ({ socket }: SocketConnectedProps) => {
  const { state } = React.useContext(Store);

  const blackRevealed = { backgroundColor: "#000", color: "#DDD" };
  const blueRevealed = { backgroundColor: blueTeamColor, color: "#DDD" };
  const redRevealed = { backgroundColor: redTeamColor, color: "#DDD" };
  const whiteRevealed = { backgroundColor: "#FFF", color: "#000" };
  const blackUnrevealedSpy = { backgroundColor: "#333", color: "#DDD" };
  const blueUnrevealedSpy = { backgroundColor: "#888", color: blueTeamColor };
  const redUnrevealedSpy = { backgroundColor: "#888", color: redTeamColor };
  const whiteUnrevealedSpy = { backgroundColor: "#888", color: "#FFF" };
  const UnrevealedPlayer = { backgroundColor: "#888", color: "#000" };

  const [board, setBoard] = React.useState([]);

  React.useEffect(() => {
    if (socket) {
      socket.on("boardUpdate", (boardObject) => {
        console.log(boardObject);
        setBoard(boardObject);
      });

      socket.on("boardUpdate", (boardObject) => {
        console.log(boardObject);
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
  );
};

export default Board;
