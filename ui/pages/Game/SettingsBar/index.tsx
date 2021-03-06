import * as React from "react";
import ISocketConnectedProps from "../../../shared/ISocketConnectedProps";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Store } from "../../../Store";
import { Settings, SupervisedUserCircle, SupervisorAccount, Loop, Visibility } from "@material-ui/icons";
import GameLobby from "../Lobby";
import { EGameState } from "../../../../shared";
import GuessBox from "./GuessBox";

interface SettingsBarProps extends ISocketConnectedProps {
  gameState: EGameState;
}

const SettingsBar = ({ gameState, socket }: SettingsBarProps) => {
  const { state } = React.useContext(Store);

  const [isLobbyOpen, setIsLobbyOpen] = React.useState(false);
  const [isGuessBoxOpen, setIsGuessBoxOpen] = React.useState(false);

  function changeLobbyState() {
    setIsGuessBoxOpen(false);
    setIsLobbyOpen(!isLobbyOpen);
  }

  function changeGuessBoxState() {
    setIsLobbyOpen(false);
    setIsGuessBoxOpen(!isGuessBoxOpen);
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
        <Tooltip placement="top" title={state.langRes.settingsBar.passTurn}>
          <Button onClick={passTurn}><Loop/></Button>
        </Tooltip>
        <Tooltip placement="top" title={state.langRes.settingsBar.setGuess}>
          <Button onClick={changeGuessBoxState}><Visibility/></Button>
        </Tooltip>
        {console.log(gameState)}
        <Tooltip placement="top" title={state.langRes.settingsBar.lobby}>
          <Button onClick={changeLobbyState}>
            <SupervisorAccount />
          </Button>
        </Tooltip>
      </div>
      {isLobbyOpen ? <GameLobby socket={socket} /> : null}
      {isGuessBoxOpen ? <GuessBox socket={socket} /> : null}
    </>
  );
};

export default SettingsBar;
