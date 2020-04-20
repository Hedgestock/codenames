import { Button, TextField, Typography, useTheme } from "@material-ui/core";
import * as React from "react";
import { Store } from "../../Store";
import { setCookie } from "../../tools/helpers";
import { useHistory } from "react-router-dom";

const ChooseNameModal = () => {
  const { state, dispatch } = React.useContext(Store);

  const [name, setName] = React.useState("");
  const [warningClassNames, setWarningClassNames] = React.useState(
    "choose-name--cell"
  );

  const history = useHistory();
  const theme = useTheme();

  const containerStyle = {
    backgroundColor: theme.palette.background.default,
  };

  function onNameChoose() {
    if (!state.cookie.accept) {
      setWarningClassNames(warningClassNames + " error--cell");
    } else if (name.length > 0) {
      setCookie(state.cookieName, { ...state.cookie, name }, dispatch);
      setName("");
    }
  }

  function onCookieAccept() {
    setCookie(state.cookieName, { ...state.cookie, accept: true }, dispatch);
  }

  return (
    <div className="choose-name--page">
      <div className="choose-name--container" style={containerStyle}>
        <Typography variant="h4">{state.langRes.chooseName.title}</Typography>
        <div className="choose-name--cell">
          <TextField
            label={state.langRes.chooseName.name}
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
