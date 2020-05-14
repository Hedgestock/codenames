import * as React from "react";
import HistoryItem from "./HistoryItem";
import ISocketConnectedProps from "../../../shared/ISocketConnectedProps";

const GameHistory = ({ socket }: ISocketConnectedProps) => {
  const [historyValue, setHistoryValue] = React.useState([]);

  React.useEffect(() => {
    if (socket) {
      function initListener(historyObject) {
        console.log(historyObject);
        setHistoryValue(historyObject);
      }
      socket.on("historyInit", initListener);

      function listener(historyMessage) {
        setHistoryValue((prevHistory) => [historyMessage, ...prevHistory]);
      }
      socket.on("historyMessage", listener);

      return () => {
        socket.off("historyInit", initListener);
        socket.off("historyMessage", listener);
      };
    }
  }, [socket]);

  function renderHistory() {
    return historyValue.map((item, i) => <HistoryItem key={i} {...item} />);
  }

  return <div className="history--window">{renderHistory()}</div>;
};

export default GameHistory;
