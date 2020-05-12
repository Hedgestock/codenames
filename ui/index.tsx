import { CssBaseline, ThemeProvider } from "@material-ui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import TopBar from "./TopBar";
import ChooseNameModal from "./pages/ChooseName";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { Store, StoreProvider } from "./Store";
import theme from "./shared/theme";
import Game from "./pages/Game";

const App = () => {
  const { state } = React.useContext(Store);
  return (
    <ThemeProvider theme={theme(state.cookie.darkTheme)}>
      <CssBaseline />
      <BrowserRouter>
        <>
          <TopBar />
          {state.cookie.name ? null : <ChooseNameModal />}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/:guid([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})"
              render={({ match }: any) => <Game guid={match.params.guid} />}
            />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
