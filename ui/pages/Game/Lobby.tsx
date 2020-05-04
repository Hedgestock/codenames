import * as React from "react";
import { SocketConnectedProps } from "../../../shared/interfaces";
import { Button } from "@material-ui/core";
import { Store } from "../../Store";



const GameLobby = ({ socket }: SocketConnectedProps) => {
  const { state } = React.useContext(Store);

  // React.useEffect(() => {
  //   if (socket) {
  //     socket.on("historyMessage", (historyMessage) => {
  //       console.log(historyMessage);
  //       setHistoryValue((prevHistory) => [historyMessage, ...prevHistory]);
  //     });

  //     socket.on("historyInit", (historyObject) => {
  //       setHistoryValue(historyObject);
  //     });
  //   }
  // }, [socket]);


  return (
    <Button color="primary" variant="contained" onClick={() => socket.emit("tryStartGame")}>
            {state.langRes.game.startGame}
          </Button>
  );
};

export default GameLobby;