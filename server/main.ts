import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import api from "./api";

const port = process.argv[2] ?? 8080;

const app: express.Application = express();

app.use(cookieParser());
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies["codenames.pamarthur.fr.cookie"];
  if (cookie === undefined) {
    res.cookie(
      "codenames.pamarthur.fr.cookie",
      {},
      { maxAge: 900000000, httpOnly: true }
    );
  }
  next();
});

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/api", api);

app.get("**/*", function (req: any, res: any) {
  console.log("dirname", __dirname);
  res.sendFile(path.join(__dirname, "index.html"));
});

console.info(`Server is listening at port ${port}`);
app.listen(port);
