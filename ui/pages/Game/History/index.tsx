import * as React from "react";
import HistoryItem from "./HistoryItem";

interface GameHistoryProps {
  socket: SocketIOClient.Socket;
}

const GameHistory = ({ socket }: GameHistoryProps) => {
  const [historyValue, setHistoryValue] = React.useState([]);

  React.useEffect(() => {
    if (socket) {
      socket.on("historyMessage", (historyMessage) => {
        console.log(historyMessage);
        setHistoryValue((prevHistory) => [...prevHistory, historyMessage]);
      });

      socket.on("historyInit", (historyObject) => {
        setHistoryValue(historyObject);
      });
    }
  }, [socket]);

  function renderHistory() {
    return historyValue.map((item, i) => <HistoryItem key={i} {...item} />);
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        margin: "10px",
      }}
    >
      {renderHistory()}
    </div>
  );
};

export default GameHistory;
