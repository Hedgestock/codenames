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
import { IGuess } from "../../../../shared";

const GuessBox = ({ socket }: ISocketConnectedProps) => {
  const { state } = React.useContext(Store);

  const [hint, setHint] = React.useState("");
  const [wordNumber, setWordNumber] = React.useState(2);

  const setGuess = React.useCallback(() => {
    const trimmed = hint.trim().split(" ")[0];
    if (trimmed !== "" && socket) {
      const guess: IGuess = { wordNumber, hint: trimmed };
      socket.emit("trySetGuess", guess);
      setHint("");
      setWordNumber(2);
    }
  }, [socket, hint, wordNumber]);

  function handleKeyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      setGuess();
    }
  }

  function handleHintChange(e) {
    setHint(e.target.value);
  }

  function handleWordNumberChange(e) {
    console.log(typeof e.target.value);
    setWordNumber(e.target.value);
  }

  const WordNumberSelect = (
    <Select value={wordNumber} onChange={handleWordNumberChange}>
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
      onKeyDown={handleKeyPress}
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
      inputProps={{
        maxLength: 32,
      }}
    />
  );
};

export default GuessBox;
