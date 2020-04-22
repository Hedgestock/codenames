import bodyParser from "body-parser";
import express from "express";
import path from "path";
import socketio from "socket.io";
import { cookieMiddleWare } from "./tools/helpers";
import wsCallback from "./ws";

const port = process.argv[2] ?? 8080;

const app: express.Application = express();

let httpServer = require("http").Server(app);

let io = socketio(httpServer, { serveClient: false, path: "/ws" });

app.use(bodyParser.json());
app.use(cookieMiddleWare);

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/resources", express.static(path.join(__dirname, "./resources")));

app.get("**/*", function (req: any, res: any) {
  res.sendFile(path.join(__dirname, "index.html"));
});


const nsp = io.of("/my-namespace");
nsp.on("connection", function (socket) {
  console.log("someone connected");
});

httpServer.listen(port, () =>
  console.info(`Server is listening at port ${port}`)
);
