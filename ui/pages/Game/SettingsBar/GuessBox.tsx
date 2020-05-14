import {
  Input,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  Button,
} from "@material-ui/core";
import * as React from "react";
import ISocketConnectedProps from "../../../shared/ISocketConnectedProps";
import { Store } from "../../../Store";
import { Send } from "@material-ui/icons";

const GuessBox = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);

  const [hint, setHint] = React.useState("");
  const [wordNumber, setWordNumber] = React.useState(1);

  const setGuess = React.useCallback(() => {
    if (socket) {
      socket.emit("trySetGuess");
    }
  }, [socket, hint, wordNumber]);

  function handleHintChange(e) {
    setHint(e.target.value);
  }

  function handleWordNumberChange(e) {
    console.log(typeof e.target.value);
    setWordNumber(e.target.value);
  }

  const WordNumberSelect = (
    <Select
      value={wordNumber}
      onChange={handleWordNumberChange}
     >
      {[...new Array(9).keys()].map((num) => {
        num++;
        return (
          <MenuItem key={num} value={num}>
            {`${state.langRes.guess.in} ${num} ${state.langRes.guess.word}`}
          </MenuItem>
        );
      })}
    </Select>
  );

  return (
    <TextField
      variant="outlined"
      margin="dense"
      value={hint}
      onChange={handleHintChange}
      helperText={state.langRes.guess.helper}
      label={state.langRes.guess.hint}
      placeholder={state.langRes.guess.hint}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">{WordNumberSelect}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button color="primary" onClick={setGuess}>
              <Send />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default GuessBox;
