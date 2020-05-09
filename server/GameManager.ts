import socketio from "socket.io";
import { EventEmitter } from "events";
import {
  IUser,
  IChatMessage,
  ICard,
  GameState,
  IPlayer,
  IHistoryItem,
  HistoryAction,
  Team,
} from "../shared/interfaces";
import BoardManager from "./BoardManager";

export default class {
  constructor(gameMaster: IUser, uuid: string, io: socketio.Server) {
    this.first = "blue";
    this.io = io;
    this.uuid = uuid;
    this._gameMasterUUID = gameMaster.uuid;
    this.history = [];
    this.chat = [];
    this.players = {};
    this._boardManager = new BoardManager();
    this._eventEmitter = new EventEmitter();
    this.state = GameState.beforeStart;
  }

  private _eventEmitter: EventEmitter;
  private _gameMasterUUID: string;
  private io: socketio.Server;
  private uuid: string;
  private history: any[];
  private chat: IChatMessage[];
  private players;
  private _boardManager: BoardManager;
  private state: GameState;
  private first: Team;

  get eventEmitter() {
    return this._eventEmitter;
  }

  get gameMasterUUID() {
    return this._gameMasterUUID;
  }

  get board() {
    return this._boardManager;
  }

  getPlayers() {
    return this.players;
  }

  getChat() {
    return this.chat;
  }

  getHistory() {
    return this.history;
  }

  getGameState() {
    return this.state;
  }

  getBlueSpyMaster() {
    //: IPlayer {
    const playerPair = Object.entries(this.players).find(
      //@ts-ignore
      (e) => e[1].isSpyMaster && e[1].team === "blue"
    );
    return playerPair && playerPair[1];
  }

  getRedspyMaster() {
    //: IPlayer {
    const playerPair = Object.entries(this.players).find(
      //@ts-ignore
      (e) => e[1].isSpyMaster && e[1].team === "red"
    );
    return playerPair && playerPair[1];
  }

  getGameMaster() {
    //: IPlayer {
    const playerPair = Object.entries(this.players).find(
      //@ts-ignore
      (e) => e[1].isGameMaster
    );
    return playerPair && playerPair[1];
  }

  private setGameState(newState: GameState) {
    this.state = newState;
    this.io.to(this.uuid).emit("gameStateChanged", this.state);
  }

  playersBlue(): number {
    return Object.entries(this.players).filter(
      //@ts-ignore
      (e) => e[1].team === "blue"
    ).length;
  }

  playersRed(): number {
    return Object.entries(this.players).filter(
      //@ts-ignore
      (e) => e[1].team === "red"
    ).length;
  }

  makePlayerRed(playerUUID: string) {
    const player: IPlayer = this.players[playerUUID];
    player && (player.team = "red");
    this.io.to(this.uuid).emit("playersUpdate", this.getPlayers());
  }

  makePlayerBlue(playerUUID: string) {
    const player: IPlayer = this.players[playerUUID];
    player && (player.team = "blue");
    this.pushHistory({ player, action: "isSpyMaster" });
    this.io.to(this.uuid).emit("playersUpdate", this.getPlayers());
  }

  makePlayerGameMaster(playerUUID: string) {
    throw "Not implemented";
    this.io.to(this.uuid).emit("playersUpdate", this.getPlayers());
  }

  makePlayerSpy(playerUUID: string) {
    const player: IPlayer = this.players[playerUUID];
    if (player.isSpyMaster) return;
    if (player.team == "red") {
      const redSpy = this.getRedspyMaster();
      //@ts-ignore
      redSpy && (redSpy.isSpyMaster = false);
    } else {
      const blueSpy = this.getBlueSpyMaster();
      //@ts-ignore
      blueSpy && (blueSpy.isSpyMaster = false);
    }
    player.isSpyMaster = true;
    this.pushHistory({ player, action: "isSpyMaster" });
    this.io.to(this.uuid).emit("playersUpdate", this.getPlayers());
  }

  pushHistory(historyItem: IHistoryItem) {
    this.history.unshift(historyItem);
    this.io.to(this.uuid).emit("historyMessage", historyItem);
  }

  pushMessage(message: IChatMessage) {
    this.chat.unshift(message);
    this.io.to(this.uuid).emit("message", message);
  }

  tryStartGame(playerUUID: string) {
    if (
      this.state === GameState.beforeStart &&
      this.players[playerUUID] &&
      this.players[playerUUID].isAdmin
    ) {
      this.setGameState(GameState.blueSpyTalking);
      this.pushHistory({
        player: this.players[playerUUID],
        action: "startedGame",
      });

      this._eventEmitter.emit("boardUpdate");
    }
  }

  tryReveal(playerUUID: string, pos: number) {
    if (this.players[playerUUID] && !this.players[playerUUID].isSpyMaster) {
      const cardRevealed = this._boardManager.revealCard(pos);
      if (cardRevealed) {
        this.pushHistory({
          player: this.players[playerUUID],
          action: "revealed",
          card: cardRevealed,
        });
        this._eventEmitter.emit("boardUpdate");
      }
      // this.sendBoard();
      // if (this.state === GameState.blueGuess &&  this.playersBlue[playerUUID])
      // {
      //   this.board[pos].revealed = true;
      //   this.sendBoard();
      // }
      // if (this.state === GameState.redGuess &&  this.playersRed[playerUUID])
      // {
      //   this.board[pos].revealed = true;
      //   this.sendBoard();
      // }
    }
  }

  private capitalize(str: string): string {
    if (str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  }

  addPlayer(user: IUser) {
    if (this.players[user.uuid]) {
      return;
    }

    let team: "blue" | "red";
    let isSpyMaster = false;

    if (this.playersBlue() > this.playersRed()) {
      if (!this.getRedspyMaster()) {
        isSpyMaster = true;
      }
      team = "red";
    } else {
      if (!this.getBlueSpyMaster()) {
        isSpyMaster = true;
      }
      team = "blue";
    }

    const player: IPlayer = {
      isAdmin: this.isGameMaster(user),
      team,
      isSpyMaster,
      name: user.name,
    };

    if (player.isAdmin) {
      this.pushHistory({
        player,
        action: "isGameMaster",
      });
    }

    this.pushHistory({
      player,
      action: ("is" + this.capitalize(player.team)) as HistoryAction,
    });

    if (isSpyMaster) {
      this.pushHistory({ player, action: "isSpyMaster" });
    }

    this.players[user.uuid] = player;

    this.io.to(this.uuid).emit("playersUpdate", this.getPlayers());
  }

  isGameMaster(param: string | IUser) {
    if (typeof param === "string") {
      return param === this._gameMasterUUID;
    }

    return param.uuid === this._gameMasterUUID;
  }

  isSpy(param: string | IUser) {
    if (typeof param !== "string") {
      return (param = param.uuid);
    }

    return this.players[param].isSpyMaster;
  }

  startGame() {
    if (
      Object.entries(this.players).length >= 4 &&
      this.state === GameState.beforeStart
    ) {
      this.state =
        this.first === "blue"
          ? GameState.blueSpyTalking
          : GameState.redSpyTalking;
    } else {
      console.error("Couldn't start game.");
    }
  }

  removePlayer(param: string | IUser) {
    if (typeof param !== "string") {
      param = param.uuid;
    }
    if (this.players[param]) {
      const deletedPlayer = this.players[param];
      delete this.players[param];
      this.pushHistory({ player: deletedPlayer, action: "disconnected" });

      if (deletedPlayer.isAdmin) {
        const found = Object.entries(this.players)[0];
        if (found) {
          this._gameMasterUUID = found[0];
          //@ts-ignore
          let newAdmin: IPlayer = found[1];
          //@ts-ignore
          newAdmin.isAdmin = true;
          this.pushHistory({
            player: newAdmin,
            action: "isGameMaster",
          });
        }
      }

      if (deletedPlayer.isSpyMaster) {
        //@ts-ignore
        const found: [string, IPlayer] = Object.entries(this.players).find(
          //@ts-ignore
          (pair) => pair[1].team === deletedPlayer.team
        );
        let newSpyMasterId = undefined;
        if (found) {
          newSpyMasterId = found[0];
          //@ts-ignore
          found[1].isSpyMaster = true;
          this.pushHistory({
            player: found[1],
            action: "isSpyMaster",
          });
        }
      }

      this.io.to(this.uuid).emit("playersUpdate", this.getPlayers());
    }
  }
}
