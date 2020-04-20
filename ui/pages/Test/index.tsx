import * as React from "react";
import { Store } from "../../Store";
import Board from "./Board";

const Test = () => {
  const { state, dispatch } = React.useContext(Store);
  function find() {
    window.location.href = "https://www.google.com/search?q=" + window.location.href;
  }

  return (
    <div className="page">
      <div className="page-container">
        <Board/>
      </div>
    </div>
  );
};

export default Test;
