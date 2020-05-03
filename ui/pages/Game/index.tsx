import * as React from "react";
import { Store } from "../../Store";
import Board from "./Board";
import GameChat from "./Chat";
import GameHistory from "./History";
import io from "socket.io-client";

interface GameProps {
  guid: string;
}

const Test = ({ guid }: GameProps) => {
  const { state } = React.useContext(Store);

  const [socket, setSocket] = React.useState(null);

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
      <GameChat
        inputLabel={state.langRes.chat.input}
        guid={guid}
        socket={socket}
      />
      <Board socket={socket} />
      <GameHistory socket={socket} />
    </div>
  );
};

export default Test;
