import * as React from "react";
import { Store } from "../../Store";
import Board from "./Board";
import GameChat from "./Chat";
import GameHistory from "./History";
import io from "socket.io-client";
import { GameState } from "../../../shared/interfaces";
// import {
//   TextField,
//   InputAdornment,
//   IconButton,
// } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
// import { FileCopy } from "@material-ui/icons";
import FileCopy from "@material-ui/icons/FileCopy";
import GameLobby from "./Lobby";

interface GameProps {
  guid: string;
}

const Game = ({ guid }: GameProps) => {
  const { state } = React.useContext(Store);

  const [socket, setSocket] = React.useState(null);
  const [player, setPlayer] = React.useState(null);
  const [gameState, setGameState] = React.useState(GameState.beforeStart);

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
    }

    return () => {
      if (socket) {
        console.debug("socket closing");
        socket.close();
      }
    };
  }, [state.cookie.userUUID, state.cookie.name]);

  React.useEffect(() => {
    if (socket) {
      socket.on("gameStateChanged", (gameStateObject) =>
        setGameState(gameStateObject)
      );
    }
  }, [socket]);

  console.debug("gs", gameState);
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
              <FileCopy color="action" fontSize="small" />
            </IconButton>
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
      <GameChat guid={guid} socket={socket} />
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          flexGrow: 2,
          height: "100%",
        }}
      >
        {gameState === GameState.beforeStart ? (
          <GameLobby socket={socket} />
        ) : (
          <Board socket={socket} />
        )}
        <ShareURL />
      </div>
      <GameHistory socket={socket} />
    </div>
  );
};

export default Game;
