import { Button } from "@material-ui/core";
import * as React from "react";
import { IPlayer } from "../../../shared";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";
import { Store } from "../../Store";
import PlayerChip from "./PlayerChip";

const GameLobby = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);

  const [players, setPlayers] = React.useState(new Map<string, IPlayer>());
  console.log(players);
  console.log(players.entries);

  React.useEffect(() => {
    if (socket) {
      socket.on("playersUpdate", (playersArray) => {
        console.log("playersObject", playersArray);
        setPlayers(new Map(playersArray));
      });

      // socket.emit("requestPlayers");
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

  return (
    <>
      <div style={{ display: "flex", height: "100%", padding: "5px" }}>
        {Array.from(players.entries()).map(([uuid, player], i) => {
          return (
            <PlayerChip
              key={i}
              player={player}
              commands={{
                makeGameMaster: tryModifyPlayer(
                  uuid,
                  "tryMakePlayerGameMaster"
                ),
                makeSpyMaster: tryModifyPlayer(uuid, "tryMakePlayerGameMaster"),
                changeTeam: tryModifyPlayer(uuid, "tryChangePlayerTeam"),
              }}
            />
          );
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
