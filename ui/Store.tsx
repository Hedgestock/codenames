import React from "react";
import Cookie from "cookie";

import { fr, en } from "./lang";

export const Store = React.createContext(undefined);
const cookieName = "codenames.pamarthur.fr.cookie";
const cookie = JSON.parse(
  Cookie.parse(document.cookie)[cookieName].substring(2)
);

function getLangFromCookie() {
  switch (cookie.lang) {
    case "en":
      return en;
    case "fr":
    default:
      return fr;
  }
}

const initialState = {
  langRes: getLangFromCookie(),
  cookieName,
  cookie,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LANG":
      switch (action.payload.lang) {
        case "en":
          return {
            ...state,
            cookie: { ...state.cookie, lang: action.payload },
            langRes: en,
          };
        case "fr":
        default:
          return {
            ...state,
            cookie: { ...state.cookie, lang: action.payload },
            langRes: fr,
          };
      }
    case "SET_COOKIE":
      return {
        ...state,
        cookie: action.payload,
      };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
