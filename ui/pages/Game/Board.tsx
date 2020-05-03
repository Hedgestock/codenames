import * as React from "react";
import GameCard from "./GameCard";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import { Store } from "../../Store";
import { OpenInNew } from "@material-ui/icons";
import { ICard } from "../../../shared/interfaces";
import { redTeamColor, blueTeamColor } from "../../theme";


interface GameBoardProps {
  socket: SocketIOClient.Socket;
}

const Board = ({ socket }: GameBoardProps) => {
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

  function renderBoard() {
    let cards = board.map((c, i) => (
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
    ));
    return <div className="game-board">{cards}</div>;
  }

  return (
    <div style={{ display: "flex", flexFlow: "column", flexGrow: 2}}>
      <TextField
        id="shareURL"
        label={state.langRes.board.roomLinkTitle}
        multiline
        variant="outlined"
        margin="dense"
        disabled
        value={window.location.href}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  const dummy = document.createElement("textarea");
                  // dummy.style.display = 'none'
                  document.body.appendChild(dummy);
                  dummy.value = window.location.href;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                }}
              >
                <OpenInNew />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {renderBoard()}
    </div>
  );
};

export default Board;
