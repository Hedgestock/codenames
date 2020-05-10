import * as React from "react";
import ISocketConnectedProps from "../../shared/ISocketConnectedProps";
import { Button, IconButton } from "@material-ui/core";
import { Store } from "../../Store";
import { Settings } from "@material-ui/icons";

const SettingsBar = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "-webkit-fill-available"
      }}
    >
      <Button>{state.langRes.game.passTurn}</Button>
      <IconButton color="primary" onClick={() => alert("not implemented")}>
        <Settings />
      </IconButton>
    </div>
  );
};

export default SettingsBar;
