import { Button } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Store } from "../../Store";

const Home = () => {
  const { state } = React.useContext(Store);

  const history = useHistory();

  function createGame() {
    history.push(`/${uuidv4()}`);
  }

  return (
    <div className="page">
      <Button onClick={createGame}>{state.langRes.home.createGame}</Button>
    </div>
  );
};

export default Home;
