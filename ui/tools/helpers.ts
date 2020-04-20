import Cookie from "cookie";

export function setCookie(name: string, content: object, dispatch, options?) {
  dispatch({
    type: "SET_COOKIE",
    payload: content,
  });
  document.cookie = Cookie.serialize(
    name,
    "j:" + JSON.stringify(content),
    options
  );
}

export function setLang(name: string, content: object, dispatch, options?) {
  dispatch({
    type: "SET_LANG",
    payload: content,
  });
  document.cookie = Cookie.serialize(
    name,
    "j:" + JSON.stringify(content),
    options
  );
}
