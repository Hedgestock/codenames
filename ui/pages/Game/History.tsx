import * as React from "react";
import { TextField, InputBase, Button, IconButton } from "@material-ui/core";
import { Send } from "@material-ui/icons";

const GameHistory = () => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        margin: "10px",
        flexGrow: 1,
        maxHeight: "90%",
        minHeight: "90%",
      }}
    >
      <TextField
        multiline
        variant="outlined"
        rows={30}
        rowsMax={30}
        disabled
        value={null}
      />
      <br />
      <div style={{ display: "flex" }}>
        <TextField
          multiline
          variant="outlined"
          rowsMax={4}
          style={{ flexGrow: 1 }}
        />
        <IconButton color="primary">
          <Send />
        </IconButton>
      </div>
    </div>
  );
};

export default GameHistory;
