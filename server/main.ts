import bodyParser from "body-parser";
import express from "express";
import path from "path";
import socketio from "socket.io";
import { cookieMiddleWare } from "./tools/helpers";
import Game from "./Game";

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
    games[gameUUID] = new Game({ name, uuid: userUUID }, gameUUID, io);
    // setInterval(() => console.debug(games[gameUUID]), 10000);
  }

  const game: Game = games[gameUUID];

  game
    .addPlayer({ name, uuid: userUUID })
    .map((a) => game.pushHistory(a));

    socket.emit("chatInit", game.getChat());
    socket.emit("historyInit", game.getHistory());

  function boardUpdate() {
    if (game.isSpy(userUUID)) {
      socket.emit("boardUpdate", game.getSpyBoard());
    } else {
      socket.emit("boardUpdate", game.getPlayerBoard());
    }
  }

  boardUpdate();

  game.eventEmitter.on("boardUpdate", boardUpdate);

  socket.on("message", function (message: any) {
    console.log(name, message);
    game.pushMessage({ message, author: name });
  });

  socket.on("tryReveal", (pos) => {
    game.revealCard(userUUID, pos);
  });

  socket.on("disconnect", () => {
    game.removePlayer(userUUID);
    console.log("deco");
  });
});

httpServer.listen(port, () =>
  console.info(`Server is listening at port ${port}`)
);
