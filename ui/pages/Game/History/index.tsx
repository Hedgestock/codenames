import * as React from "react";
import HistoryItem from "./HistoryItem";
import ISocketConnectedProps from "../../../shared/ISocketConnectedProps";

const GameHistory = ({ socket }: ISocketConnectedProps) => {
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
        overflowY: "auto",
        overflowX: "hidden",
        width: "-webkit-fill-available",
      }}
    >
      {renderHistory()}
    </div>
  );
};

export default GameHistory;
