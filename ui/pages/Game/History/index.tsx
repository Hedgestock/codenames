import * as React from "react";
import HistoryItem from "./HistoryItem";
import { SocketConnectedProps } from "../../../../shared/interfaces";


const GameHistory = ({ socket }: SocketConnectedProps) => {
  const [historyValue, setHistoryValue] = React.useState([]);

  React.useEffect(() => {
    if (socket) {
      socket.on("historyMessage", (historyMessage) => {
        setHistoryValue((prevHistory) => [historyMessage, ...prevHistory]);
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
        flexFlow: "column-reverse",
        flexGrow: 1,
        margin: "10px",
        overflowY: "auto",
        overflowX: "hidden",
        height: "100%",
      }}
    >
      {renderHistory()}
    </div>
  );
};

export default GameHistory;
