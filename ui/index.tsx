import { CssBaseline, ThemeProvider } from "@material-ui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopBar from "./lang/TopBar";
import ChooseNameModal from "./pages/ChooseName";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { Store, StoreProvider } from "./Store";
import theme from "./theme";
import Test from "./pages/Test";

const App = () => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <ThemeProvider theme={theme(state.cookie.darkTheme)}>
      <CssBaseline />
      <BrowserRouter>
        <>
          <TopBar />
          {state.cookie.name ? null : <ChooseNameModal />}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/test" exact component={Test} />
            <Route path="/profile" exact component={Profile} />
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
