import * as React from "react";
import { TextField, InputBase, Button, IconButton } from "@material-ui/core";


interface GameHistoryProps {
  socket: SocketIOClient.Socket;
}

const GameHistory = ({ socket }: GameHistoryProps) => {

const [testValue, setTestValue] = React.useState("")

  React.useEffect(() => {
    if (socket) {
      socket.on("historyMessage", (historyMessage) => {
        console.log(historyMessage);
        setTestValue(JSON.stringify(historyMessage));
      });
    }
  }, [socket]);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        margin: "10px",
        flexGrow: 1,
      }}
    >
       <TextField disabled value={testValue} />
   
      <br />
      <div style={{ display: "flex" }}>
       <TextField disabled/>
      </div>
    </div>
  );
};

export default GameHistory;
