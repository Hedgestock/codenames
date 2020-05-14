import { Button, TextField, Typography, useTheme } from "@material-ui/core";
import * as React from "react";
import { Store } from "../../Store";
import { setCookie } from "../../tools/helpers";

const ChooseNameModal = () => {
  const { state, dispatch } = React.useContext(Store);

  const [name, setName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [help, setHelp] = React.useState("");
  const [warningClassNames, setWarningClassNames] = React.useState(
    "choose-name--cell"
  );

  const theme = useTheme();

  const containerStyle = {
    backgroundColor: theme.palette.background.default,
  };

  function onNameChoose() {
    if (!state.cookie.accept) {
      setWarningClassNames(warningClassNames + " error--cell");
      setHelp(state.langRes.chooseName.cookieError);
      setError(true);
    } else if (name.trim().length <= 0) {
      setHelp(state.langRes.chooseName.emptyName);
      setError(true);
    } else {
      setCookie(
        state.cookieName,
        { ...state.cookie, name: name.trim() },
        dispatch
      );
      setName("");
      setHelp("");
      setError(false);
    }
  }

  function onCookieAccept() {
    setCookie(state.cookieName, { ...state.cookie, accept: true }, dispatch);
    setHelp("");
    setError(false);
  }

  return (
    <div className="modal--page">
      <div className="modal--container" style={containerStyle}>
        <Typography variant="h4">{state.langRes.chooseName.title}</Typography>
        <div className="choose-name--cell">
          <TextField
            error={error}
            label={state.langRes.chooseName.name}
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            helperText={help}
            style={{width: "50%"}}
            inputProps={{
              maxLength: 32
            }}
          />
          <Button variant="contained" color="primary" onClick={onNameChoose}>
            {state.langRes.chooseName.choose}
          </Button>
        </div>
        {state.cookie.accept ? null : (
          <div className={warningClassNames}>
            <Typography>{state.langRes.chooseName.cookieWarning}</Typography>
            <Button variant="contained" onClick={onCookieAccept}>
              {state.langRes.chooseName.accept}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onCookieAccept}
            >
              {state.langRes.chooseName.agree}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseNameModal;
