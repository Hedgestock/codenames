import { Button, Typography, Badge } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../../Store";
import GameCard from "./Card";

const Board = () => {
  const { state, dispatch } = React.useContext(Store);

  const blackRevealed = { backgroundColor: "#000", color: "#DDD" };
  const blueRevealed = { backgroundColor: "#00008B", color: "#DDD" };
  const redRevealed = { backgroundColor: "#8B0000", color: "#DDD" };
  const whiteRevealed = { backgroundColor: "#FFF", color: "#000" };
  const blackUnrevealedSpy = { backgroundColor: "#333", color: "#DDD" };
  const blueUnrevealedSpy = { backgroundColor: "#888", color: "#00008B" };
  const redUnrevealedSpy = { backgroundColor: "#888", color: "#8B0000" };
  const whiteUnrevealedSpy = { backgroundColor: "#AAA", color: "#000" };
  const UnrevealedPlayer = { backgroundColor: "#888", color: "#000" };

  return (
    <div style={{display: "flex", flexFlow: "column"}}>

    <div className="game-board">
      <GameCard column={1} row={1} style={blackUnrevealedSpy} votes={1}>
        Black unrevealed spy
      </GameCard>
      <GameCard column={2} row={1} style={blueUnrevealedSpy}votes={2}>
        Blue unrevealed spy
      </GameCard>
      <GameCard column={3} row={1} style={redUnrevealedSpy}>
        Red unrevealed spy
      </GameCard>
      <GameCard column={4} row={1} style={whiteUnrevealedSpy}>
        White unrevealed spy
      </GameCard>
      <GameCard column={5} row={1} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={1} row={2} style={blackRevealed}>
        Black revealed
      </GameCard>
      <GameCard column={2} row={2} style={blueRevealed}>
        Blue revealed
      </GameCard>
      <GameCard column={3} row={2} style={redRevealed}>
        Red revealed
      </GameCard>
      <GameCard column={4} row={2} style={whiteRevealed}>
        White revealed
      </GameCard>
      <GameCard column={5} row={2} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={1} row={3} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={2} row={3} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={3} row={3} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={4} row={3} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={5} row={3} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={1} row={4} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={2} row={4} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={3} row={4} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={4} row={4} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={5} row={4} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={1} row={5} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={2} row={5} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={3} row={5} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={4} row={5} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
      <GameCard column={5} row={5} style={UnrevealedPlayer}>
        unrevealed player
      </GameCard>
    </div>
    </div>
  );
};

export default Board;
