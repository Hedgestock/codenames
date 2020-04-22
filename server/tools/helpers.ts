import Cookie from "cookie";
import { v4 as uuidv4 } from "uuid";

const cookieName = "codenames.pamarthur.fr.cookie";

function extractCookie(name: string, cookies) {
  try {
    return JSON.parse(Cookie.parse(cookies)[name]);
  } catch (error) {
    return undefined;
  }
}

export function cookieMiddleWare(req, res, next) {
  let cookie = extractCookie(cookieName, req.headers.cookie);

  if (!cookie || !cookie.userUUID) {
    res.cookie(
      cookieName,
      JSON.stringify({
        userUUID: uuidv4(),
        accept: false,
        darkTheme: true,
        lang: "fr",
      }),
      { maxAge: 900000000 }
    );
  }
  next();
}
