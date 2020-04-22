import * as React from "react";
import { Store } from "../../Store";
import Board from "./Board";
import GameChat from "./Chat";
import GameHistory from "./History";

interface GameProps {
  guid: string;
}

const Test = ({ guid }: GameProps) => {

  const { state, dispatch } = React.useContext(Store);

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
        />
      </div>
    </div>
  );
};

export default Test;
