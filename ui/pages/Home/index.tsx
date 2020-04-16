import * as React from "react";
import { Store } from "../../Store";

const Home = () => {
  const { state, dispatch } = React.useContext(Store);

  return <div>{state.username}</div>;
};

export default Home;
