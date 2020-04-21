import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import api from "./api";

const port = process.argv[2] ?? 8080;

const cookieName = "codenames.pamarthur.fr.cookie";

const app: express.Application = express();

app.use(cookieParser());
app.use(function (req, res, next) {
  const cookie = req.cookies[cookieName];
  if (!cookie || !cookie.userUUID) {
    res.cookie(
      cookieName,
      { userUUID: uuidv4(), accept: false, darkTheme: true, lang: "fr" },
      { maxAge: 900000000 }
    );
  }
  next();
});

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/resources", express.static(path.join(__dirname, "./resources")));
app.use("/api", api);

app.get("**/*", function (req: any, res: any) {
  const cookie = req.cookies["codenames.pamarthur.fr.cookie"];
  res.sendFile(path.join(__dirname, "index.html"));
});

console.info(`Server is listening at port ${port}`);
const server = app.listen(port);
