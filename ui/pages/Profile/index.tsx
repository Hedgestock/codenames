import {
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Switch,
} from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../../Store";
import { setCookie } from "../../tools/helpers";

const Profile = () => {
  const { state, dispatch } = React.useContext(Store);

  const history = useHistory();

  function expireCookie() {
    setCookie(state.cookieName, {}, dispatch, { expires: new Date(0) });
    window.location.href = "https://www.cookiebot.com/";
  }

  function handleCookieChange() {
    setCookie(
      state.cookieName,
      { ...state.cookie, accept: !state.cookie.accept },
      dispatch
    );
  }

  function handleThemeChange() {
    setCookie(
      state.cookieName,
      { ...state.cookie, darkTheme: !state.cookie.darkTheme },
      dispatch
    );
  }

  function resetName() {
    setCookie(state.cookieName, { ...state.cookie, name: undefined }, dispatch);
  }

  return (
    <div className="page">
      <div
        className="profile--container"
        style={{
          width: "600px",
          display: "flex",
          flexFlow: "column",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={resetName}>
          {state.langRes.nameChange}
        </Button>
        <br />
        <FormControlLabel
          control={
            <Switch
              checked={state.cookie.darkTheme}
              onChange={handleThemeChange}
            />
          }
          label={state.langRes.profile.useDarkTheme}
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={state.cookie.accept}
              checked={state.cookie.accept}
              onChange={handleCookieChange}
            />
          }
          label={state.langRes.profile.cookieStatus}
        />
        {state.cookie.accept ? (
          <Button variant="contained" onClick={expireCookie}>
            {state.langRes.profile.cookieErase}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
