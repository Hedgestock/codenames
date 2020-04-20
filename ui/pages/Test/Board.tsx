import { Button, Typography } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../../Store";

const Board = () => {
  const { state, dispatch } = React.useContext(Store);

  const blackRevealed = {backgroundColor: "#000", color:"#DDD"}
  const blueRevealed = {backgroundColor: "#00008B", color:"#DDD"}
  const redRevealed = {backgroundColor: "#8B0000", color:"#DDD"}
  const whiteRevealed = {backgroundColor: "#FFF", color:"#000"}
  const blackUnrevealedSpy = {backgroundColor: "#333", color:"#DDD"}
  const blueUnrevealedSpy = {backgroundColor: "#888", color:"#00008B"}
  const redUnrevealedSpy = {backgroundColor: "#888", color:"#8B0000"}
  const whiteUnrevealedSpy = {backgroundColor: "#AAA", color:"#000"}
  const UnrevealedPlayer = {backgroundColor: "#888", color:"#000"}


  return (
    <div className="game-board">
      <Button className="game-card" variant="contained" style={{ gridColumn: 1, gridRow: 1 ,...blackUnrevealedSpy}}>Black unrevealed spy</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 2, gridRow: 1 ,...blueUnrevealedSpy}}>Blue unrevealed spy</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 3, gridRow: 1 ,...redUnrevealedSpy}}>Red unrevealed spy</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 4, gridRow: 1 ,...whiteUnrevealedSpy}}>White unrevealed spy</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 5, gridRow: 1 ,...UnrevealedPlayer}}>unrevealed player</Button>

      <Button className="game-card" variant="contained" style={{ gridColumn: 1, gridRow: 2 , ...blackRevealed}}>Black revealed</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 2, gridRow: 2 , ...blueRevealed}}>Blue revealed</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 3, gridRow: 2 , ...redRevealed}}>Red revealed</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 4, gridRow: 2 , ...whiteRevealed}}>White revealed</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 5, gridRow: 2 ,...UnrevealedPlayer}}>unrevealed player</Button>

      <Button className="game-card" variant="contained" style={{ gridColumn: 1, gridRow: 3 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 2, gridRow: 3 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 3, gridRow: 3 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 4, gridRow: 3 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 5, gridRow: 3 ,...UnrevealedPlayer}}>unrevealed player</Button>
 
      <Button className="game-card" variant="contained" style={{ gridColumn: 1, gridRow: 4 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 2, gridRow: 4 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 3, gridRow: 4 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 4, gridRow: 4 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 5, gridRow: 4 ,...UnrevealedPlayer}}>unrevealed player</Button>

      <Button className="game-card" variant="contained" style={{ gridColumn: 1, gridRow: 5 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 2, gridRow: 5 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 3, gridRow: 5 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 4, gridRow: 5 ,...UnrevealedPlayer}}>unrevealed player</Button>
      <Button className="game-card" variant="contained" style={{ gridColumn: 5, gridRow: 5 ,...UnrevealedPlayer}}>unrevealed player</Button>


    </div>
  );
};

export default Board;
