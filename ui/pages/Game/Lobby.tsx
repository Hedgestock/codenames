import { Button } from "@material-ui/core";
import * as React from "react";
import { IPlayer } from "../../../shared";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";
import { Store } from "../../Store";
import PlayerChip from "./PlayerChip";

interface GameLobbyProps extends ISocketConnectedProps {
  hasStartGameButton?: boolean;
}

const GameLobby = ({ socket, hasStartGameButton = false }: GameLobbyProps) => {
  const { state } = React.useContext(Store);

  const [players, setPlayers] = React.useState(new Map<string, IPlayer>());

  React.useEffect(() => {
    function listener(playersArray) {
      setPlayers(new Map(playersArray));
    }
    if (socket) {
      socket.on("playersUpdate", listener);

      socket.emit("requestPlayers");

      return () => {
        socket.off("playersUpdate", listener);
      };
    }
  }, [socket]);

  const tryModifyPlayer = React.useCallback(
    (playerUUID: string, eventName: string) => {
      return () => {
        if (socket) {
          socket.emit(eventName, playerUUID);
        }
      };
    },
    [socket]
  );

  const tryStartGame = React.useCallback(() => {
    if (socket) {
      socket.emit("tryStartGame");
    }
  }, [socket]);

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "5px",
          flexWrap: "wrap",
        }}
      >
        {Array.from(players.entries()).map(([uuid, player], i) => {
          return (
            <PlayerChip
              key={i}
              player={player}
              style={{ marginTop: "5px", marginRight: "5px" }}
              commands={{
                makeGameMaster: tryModifyPlayer(
                  uuid,
                  "tryMakePlayerGameMaster"
                ),
                makeSpyMaster: tryModifyPlayer(uuid, "tryMakePlayerSpyMaster"),
                changeTeam: tryModifyPlayer(uuid, "tryChangePlayerTeam"),
              }}
            />
          );
        })}
      </div>
      {hasStartGameButton ? (
        <Button
          color="primary"
          variant="contained"
          onClick={tryStartGame}
          style={{ width: "min-content", alignSelf: "center" }}
        >
          {state.langRes.game.startGame}
        </Button>
      ) : null}
    </>
  );
};

export default GameLobby;
