import bodyParser from "body-parser";
import express from "express";
import path from "path";
import socketio from "socket.io";
import { cookieMiddleWare } from "./tools/helpers";
import GameManager from "./GameManager";

let games = new Map<string, GameManager>();

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

  if (!games.get(gameUUID)) {
    games.set(gameUUID, new GameManager({ name, uuid: userUUID }, gameUUID, io));
    // setInterval(() => console.debug(games[gameUUID]), 10000);
  }

  const game: GameManager = games.get(gameUUID);

  game.addPlayer({ name, uuid: userUUID });

  socket.emit("chatInit", game.chat);
  socket.emit("historyInit", game.history);
  socket.emit("gameStateChanged", game.state);

  function boardUpdate() {
    if (game.isSpy(userUUID)) {
      socket.emit("boardUpdate", game.board.spyBoard);
    } else {
      socket.emit("boardUpdate", game.board.playerBoard);
    }
  }

  boardUpdate();

  game.eventEmitter.on("boardUpdate", boardUpdate);

  // socket.on("requestPlayers", () => {
  //   socket.emit("playersUpdate", Array.from(game.players.entries()));
  // });

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

// let testMap: Map<string, any> = new Map();
// testMap.set("1", { name: "p1", team: "blue", isAdmin: true, isSpyMaster: true });
// testMap.set("2", { name: "p2", team: "red", isAdmin: false, isSpyMaster: true });
// testMap.set("3", { name: "p3", team: "blue", isAdmin: false, isSpyMaster: false });
// console.log(Array.from(testMap.values()).filter(v => v.team == "blue").length);

httpServer.listen(port, () =>
  console.info(`Server is listening at port ${port}`)
);
