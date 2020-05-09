import bodyParser from "body-parser";
import express from "express";
import path from "path";
import socketio from "socket.io";
import { cookieMiddleWare } from "./tools/helpers";
import GameManager from "./GameManager";

let games = {};

const port = process.argv[2] ?? 8080;

const app: express.Application = express();

const httpServer = require("http").Server(app);

const io = socketio(httpServer, { serveClient: false, path: "/ws" });

app.use(bodyParser.json());
app.use(cookieMiddleWare);

app.use("/dist", express.static(path.join(__dirname, "./dist")));
app.use("/resources", express.static(path.join(__dirname, "./resources")));

app.get("**/*", function (req: any, res: any) {
  console.debug("request on ", req.path);
  console.debug("from ", req.ip);
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", function (socket) {
  const { name, userUUID, gameUUID } = socket.handshake.query;
  console.log(name + " joined " + gameUUID);

  socket.join(gameUUID);

  if (!games[gameUUID]) {
    games[gameUUID] = new GameManager({ name, uuid: userUUID }, gameUUID, io);
    // setInterval(() => console.debug(games[gameUUID]), 10000);
  }

  const game: GameManager = games[gameUUID];

  game.addPlayer({ name, uuid: userUUID });

  socket.emit("chatInit", game.getChat());
  socket.emit("historyInit", game.getHistory());
  socket.emit("gameStateChanged", game.getGameState());

  function boardUpdate() {
    if (game.isSpy(userUUID)) {
      socket.emit("boardUpdate", game.board.getSpyBoard());
    } else {
      socket.emit("boardUpdate", game.board.getPlayerBoard());
    }
  }

  boardUpdate();

  game.eventEmitter.on("boardUpdate", boardUpdate);

  socket.on("requestPlayers", () => {
    console.debug("requestPlayers");
    socket.emit("playersUpdate", game.getPlayers());
  });

  socket.on("message", function (message: any) {
    console.log(name, message);
    game.pushMessage({ message, author: name });
  });

  socket.on("tryReveal", (pos) => {
    game.tryReveal(userUUID, pos);
  });

  socket.on("tryStartGame", () => {
    game.tryStartGame(userUUID);
  });

  socket.on("tryMakePlayerSpyMaster", (playerUUID) => {
    if (game.gameMasterUUID === userUUID) {
      game.makePlayerSpy(playerUUID);
    }
  });

  socket.on("disconnect", () => {
    game.removePlayer(userUUID);
    console.log("deco");
  });
});

httpServer.listen(port, () =>
  console.info(`Server is listening at port ${port}`)
);
