import Cookie from "cookie";

export function setCookie(name: string, content: object, dispatch) {
  dispatch({
    type: "SET_COOKIE",
    payload: content,
  });
  document.cookie = Cookie.serialize(name, JSON.stringify(content), {maxAge : 60 * 60 * 24 * 90});
}

export function setLang(name: string, content: object, dispatch) {
  dispatch({
    type: "SET_LANG",
    payload: content,
  });
  document.cookie = Cookie.serialize(name, JSON.stringify(content), {maxAge : 60 * 60 * 24 * 90});
}
