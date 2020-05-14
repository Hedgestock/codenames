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
    games.set(
      gameUUID,
      new GameManager({ name, uuid: userUUID }, gameUUID, io)
    );
    // setInterval(() => console.debug(games.get(gameUUID)), 10000);
  }

  const game: GameManager = games.get(gameUUID);

  game.addPlayer({ name, uuid: userUUID });

  socket.emit("chatInit", game.chat);
  socket.emit("historyInit", game.history);
  socket.emit("gameStateChanged", game.context.state.state);

  function boardUpdate() {
    if (game.players.get(userUUID).isSpyMaster) {
      socket.emit("boardUpdate", game.board.spyBoard);
    } else {
      socket.emit("boardUpdate", game.board.playerBoard);
    }
  }

  boardUpdate();

  game.eventEmitter.on("boardUpdate", boardUpdate);
  game.eventEmitter.on("gameIsEmpty", () => games.delete(gameUUID));
  game.eventEmitter.on("gameStateChanged", () =>
    socket.emit("gameStateChanged", game.context.state.state)
  );

  socket.on("requestPlayers", () => {
    socket.emit("playersUpdate", Array.from(game.players.entries()));
  });

  socket.on("message", function (message: any) {
    game.pushMessage({ message, author: name });
  });

    socket.on("tryStartGame", () => {
    game.tryStartGame(userUUID);
  });

        socket.on("tryReveal", (pos) => {
          game.tryReveal(userUUID, pos);
        });

  socket.on("tryPassTurn", () => {
    game.tryPassTurn(userUUID);
  });

  socket.on("trySetGuess", () => {
    game.trySetGuess(userUUID);
  });

  socket.on("tryRestartGame", () => {
    game.tryRestartGame(userUUID);
  });

  socket.on("tryMakePlayerSpyMaster", (playerUUID) => {
    if (game.gameMasterUUID === userUUID) {
      game.makePlayerSpyMaster(playerUUID);
    }
  });

  socket.on("tryMakePlayerGameMaster", (playerUUID) => {
    if (game.gameMasterUUID === userUUID) {
      game.makePlayerGameMaster(playerUUID);
    }
  });

  socket.on("tryChangePlayerTeam", (playerUUID) => {
    if (game.gameMasterUUID === userUUID) {
      game.changePlayerTeam(playerUUID);
    }
  });

  socket.on("disconnect", () => {
    game.disconnectPlayer(userUUID);
    console.log(name + " disconnected from " + gameUUID);
  });
});

httpServer.listen(port, () =>
  console.info(`Server is listening at port ${port}`)
);
