import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChooseName from "./pages/ChooseName";
import { StoreProvider, Store } from "./Store";
import TopBar from "./pages/TopBar";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <TopBar />
        <Switch>
          <Route path="/chooseName">
            <ChooseName />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
