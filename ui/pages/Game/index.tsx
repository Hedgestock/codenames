import * as React from "react";
import { Store } from "../../Store";
import Board from "./Board";
import GameChat from "./Chat";
import GameHistory from "./History";
import io from "socket.io-client";
import { EGameState } from "../../../shared";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import GameLobby from "./Lobby";
import SettingsBar from "./History/SettingsBar";

interface GameProps {
  guid: string;
}

const Game = ({ guid }: GameProps) => {
  const { state } = React.useContext(Store);

  const [socket, setSocket] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [gameState, setGameState] = React.useState(EGameState.beforeStart);

  React.useEffect(() => {
    if (state.cookie.name) {
      const tmpSocket = io({
        query: {
          userUUID: state.cookie.userUUID,
          name: state.cookie.name,
          gameUUID: guid,
        },
        path: "/ws",
      });

      setSocket(tmpSocket);
      return () => tmpSocket.close();
    }
    return () => null;
  }, [state.cookie.name]);

  React.useEffect(() => {
    if (socket) {
      socket.on("gameStateChanged", (gameStateObject) =>
        setGameState(gameStateObject)
      );
    }
  }, [socket]);

  const ShareURL = () => (
    <TextField
      id="shareURL"
      label={state.langRes.game.roomLinkTitle}
      multiline
      variant="outlined"
      margin="dense"
      disabled
      value={window.location.href}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
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
              <FileCopy color="action" fontSize="small" />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        height: "90%",
        width: "100%",
      }}
    >
      <GameChat socket={socket} />
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          flexGrow: 2,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        {gameState === EGameState.beforeStart ? (
          <GameLobby socket={socket} hasStartGameButton />
        ) : (
          <Board socket={socket} gameState={gameState}/>
        )}
        <ShareURL />
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "stretch",
          margin: "10px",
          height: "100%",
          maxWidth: "400px",
        }}
      >
        <SettingsBar gameState={gameState} socket={socket} />
        <GameHistory socket={socket} />
      </div>
    </div>
  );
};

export default Game;
