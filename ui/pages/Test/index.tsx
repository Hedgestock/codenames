import * as React from "react";
import { Store } from "../../Store";
import Board from "./Board";
import { TextField } from "@material-ui/core";
import GameChat from "./Chat";
import { InsertChartOutlinedTwoTone } from "@material-ui/icons";
import GameHistory from "./History";

const Test = () => {
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
        <GameChat inputLabel={state.langRes.chat.input}/>
      </div>
    </div>
  );
};

export default Test;
