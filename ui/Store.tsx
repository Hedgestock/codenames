import React from "react";
import Cookie from "cookie";

import { fr, en } from "./lang";

export const Store = React.createContext(undefined);
console.log(Cookie.parse(document.cookie)["codenames.pamarthur.fr.cookie"]);
const initialState = {
  lang: "fr",
  langRes: fr,
  username: JSON.parse(Cookie.parse(document.cookie)["codenames.pamarthur.fr.cookie"].substring(2)).name,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LANG":
      switch (action.payload) {
        case "en":
          return {
            ...state,
            lang: action.payload,
            langRes: en,
          };
        case "fr":
        default:
          return {
            ...state,
            lang: action.payload,
            langRes: fr,
          };
      }
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
