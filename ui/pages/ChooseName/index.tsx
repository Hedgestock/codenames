import * as React from "react";
import { TextField, Button } from "@material-ui/core";
import { Store } from "../../Store";

const ChooseName = () => {
  const { state, dispatch } = React.useContext(Store);

  const [name, setName] = React.useState("");

  function sendName() {
    window.location.pathname = "/chooseName";
    window.location.search = "?name=" + name;
  }

  return (
    <>
      <TextField
        label={state.langRes.name}
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={sendName}>
        {state.langRes.choose}
      </Button>
    </>
  );
};

export default ChooseName;
