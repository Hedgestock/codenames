import { Button } from "@material-ui/core";
import * as React from "react";
import { SocketConnectedProps } from "../../../shared/interfaces";
import { Store } from "../../Store";
import PlayerChip from "./PlayerChip";

const GameLobby = ({ socket }: SocketConnectedProps) => {
  const { state } = React.useContext(Store);

  const [players, setPLayers] = React.useState({});

  React.useEffect(() => {
    if (socket) {
      socket.on("playersUpdate", (playersObject) => {
        console.debug("lol");
        setPLayers(playersObject);
      });

      socket.emit("requestPlayers");
    }
  }, [socket]);

  return (
    <>
      <div style={{ display: "flex", height: "100%", padding: "5px" }}>
        {Object.entries(players).map((e, i) => {
          console.log(e);
          //@ts-ignore
          return <PlayerChip key={i} player={e[1]} />;
        })}
      </div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => socket.emit("tryStartGame")}
      >
        {state.langRes.game.startGame}
      </Button>
    </>
  );
};

export default GameLobby;
