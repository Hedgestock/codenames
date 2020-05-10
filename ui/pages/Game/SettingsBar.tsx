import * as React from "react";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";
import { Button, IconButton } from "@material-ui/core";
import { Store } from "../../Store";
import { Settings } from "@material-ui/icons";
import GameLobby from "./Lobby";

const SettingsBar = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);

  const [isLobbyOpen, setIsLobbyOpen] = React.useState(false);

  function changeLobbyState() {
    setIsLobbyOpen(!isLobbyOpen);
  }

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
        <Button>{state.langRes.game.passTurn}</Button>
        <IconButton color="primary" onClick={changeLobbyState}>
          <Settings />
        </IconButton>
      </div>
      {isLobbyOpen ? <GameLobby socket={socket} /> : null}
    </>
  );
};

export default SettingsBar;
