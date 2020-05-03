import * as React from "react";
import { Store } from "../../Store";
import { Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

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
