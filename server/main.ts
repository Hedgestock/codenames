import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

import api from "./api";

const port = process.argv[2] ?? 8080;

const cookieName = "codenames.pamarthur.fr.cookie";

const app: express.Application = express();

app.use(cookieParser());
app.use(function (req, res, next) {
  // check if client sent cookie
  const cookie = req.cookies[cookieName];
  if (cookie === undefined) {
    res.cookie(cookieName, {userUUID: uuidv4()}, { maxAge: 900000000 });
    res.redirect("/chooseName");
  } else {
    next();
  }
});

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/api", api);

app.get("/chooseName", function (req: any, res: any) {
  const cookie = req.cookies[cookieName];
  if (req.query.name) {
    res.cookie(
      cookieName,
      { ...cookie, name: req.query.name },
      { maxAge: 900000000 }
    );
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

app.get("/", (req: any, res: any) => res.redirect("/home"));
app.get("/home", function (req: any, res: any) {
  const cookie = req.cookies["codenames.pamarthur.fr.cookie"];
  if (!cookie.name) {
    res.redirect("/chooseName");
  } else {
    console.log(cookie);
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

console.info(`Server is listening at port ${port}`);
app.listen(port);
