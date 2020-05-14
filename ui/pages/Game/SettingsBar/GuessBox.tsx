import * as React from "react";
import ISocketConnectedProps from "../../../shared/ISocketConnectedProps";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Store } from "../../../Store";
import { Settings, SupervisedUserCircle, SupervisorAccount, Loop, Visibility } from "@material-ui/icons";
import GameLobby from "../Lobby";
import { EGameState } from "../../../../shared";


const SettingsBar = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);
  
  const setGuess = React.useCallback(() => {
    if (socket) {
      socket.emit("trySetGuess");
    }
  }, [socket]);

  return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "-webkit-fill-available",
        }}
      >
        
      </div>
  );
};

export default SettingsBar;