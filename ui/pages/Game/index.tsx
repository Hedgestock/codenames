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

  const { state, dispatch } = React.useContext(Store);
  
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    const tmpSocket = io({
      query: {
        userUUID: state.cookie.userUUID,
        name: state.cookie.name,
        gameUUID: guid,
      },
      path: "/ws",
    });

    setSocket(tmpSocket);

    return () => {
      console.debug("socket closing");
      tmpSocket.close();
    };
  }, [state.cookie.userUUID, state.cookie.name]);

  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <GameHistory />
        <Board />
        <GameChat
          inputLabel={state.langRes.chat.input}
          guid={guid}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Test;
