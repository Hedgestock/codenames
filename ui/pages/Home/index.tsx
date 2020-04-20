import * as React from "react";
import { Store } from "../../Store";

const Home = () => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <div>
      {state.cookie.name}
      {state.cookie.userUUID}
    </div>
  );
};

export default Home;
