import * as React from "react";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";
import { Button, IconButton } from "@material-ui/core";
import { Store } from "../../Store";
import { Settings } from "@material-ui/icons";
import GameLobby from "./Lobby";
import { EGameState } from "../../../shared";

interface SettingsBarProps extends ISocketConnectedProps {
  gameState: EGameState;
}

const SettingsBar = ({ gameState, socket }: SettingsBarProps) => {
  const { state } = React.useContext(Store);

  const [isLobbyOpen, setIsLobbyOpen] = React.useState(false);

  function changeLobbyState() {
    setIsLobbyOpen(!isLobbyOpen);
  }

  const passTurn = React.useCallback(() => {
    if (socket) {
      socket.emit("tryPassTurn");
    }
  }, [socket]);

  const setGuess = React.useCallback(() => {
    if (socket) {
      socket.emit("trySetGuess");
    }
  }, [socket]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "-webkit-fill-available",
        }}
      >
        <Button onClick={passTurn}>{state.langRes.game.passTurn}</Button>
        <Button onClick={setGuess}>setGuess</Button>
        {console.log(gameState)}
        <IconButton color="primary" onClick={changeLobbyState}>
          <Settings />
        </IconButton>
      </div>
      {isLobbyOpen ? <GameLobby socket={socket} /> : null}
    </>
  );
};

export default SettingsBar;
