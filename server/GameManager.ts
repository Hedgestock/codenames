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
    this._first = "blue";
    this._io = io;
    this._uuid = uuid;
    this._gameMasterUUID = gameMaster.uuid;
    this._history = [];
    this._chat = [];
    this._players = {};
    this._boardManager = new BoardManager();
    this._eventEmitter = new EventEmitter();
    this._state = GameState.beforeStart;
  }

  private _eventEmitter: EventEmitter;
  private _gameMasterUUID: string;
  private _io: socketio.Server;
  private _uuid: string;
  private _history: any[];
  private _chat: IChatMessage[];
  private _players;
  private _boardManager: BoardManager;
  private _state: GameState;
  private _first: Team;

  get eventEmitter() {
    return this._eventEmitter;
  }

  get gameMasterUUID() {
    return this._gameMasterUUID;
  }

  get board() {
    return this._boardManager;
  }

  get players() {
    return this._players;
  }

  get chat() {
    return this._chat;
  }

  get history() {
    return this._history;
  }

  get state() {
    return this._state;
  }

  get blueSpyMaster() {
    //: IPlayer {
    const playerPair = Object.entries(this._players).find(
      //@ts-ignore
      (e) => e[1].isSpyMaster && e[1].team === "blue"
    );
    return playerPair && playerPair[1];
  }

  get redspyMaster() {
    //: IPlayer {
    const playerPair = Object.entries(this._players).find(
      //@ts-ignore
      (e) => e[1].isSpyMaster && e[1].team === "red"
    );
    return playerPair && playerPair[1];
  }

  get gameMaster() {
    //: IPlayer {
    const playerPair = Object.entries(this._players).find(
      //@ts-ignore
      (e) => e[1].isGameMaster
    );
    return playerPair && playerPair[1];
  }

  private setGameState(newState: GameState) {
    this._state = newState;
    this._io.to(this._uuid).emit("gameStateChanged", this._state);
  }

  playersBlue(): number {
    return Object.entries(this._players).filter(
      //@ts-ignore
      (e) => e[1].team === "blue"
    ).length;
  }

  playersRed(): number {
    return Object.entries(this._players).filter(
      //@ts-ignore
      (e) => e[1].team === "red"
    ).length;
  }

  makePlayerRed(playerUUID: string) {
    const player: IPlayer = this._players[playerUUID];
    player && (player.team = "red");
    this._io.to(this._uuid).emit("playersUpdate", this.players);
  }

  makePlayerBlue(playerUUID: string) {
    const player: IPlayer = this._players[playerUUID];
    player && (player.team = "blue");
    this.pushHistory({ player, action: "isSpyMaster" });
    this._io.to(this._uuid).emit("playersUpdate", this.players);
  }

  makePlayerGameMaster(playerUUID: string) {
    throw "Not implemented";
    this._io.to(this._uuid).emit("playersUpdate", this.players);
  }

  makePlayerSpy(playerUUID: string) {
    const player: IPlayer = this._players[playerUUID];
    if (player.isSpyMaster) return;
    if (player.team == "red") {
      const redSpy = this.redspyMaster;
      //@ts-ignore
      redSpy && (redSpy.isSpyMaster = false);
    } else {
      const blueSpy = this.blueSpyMaster;
      //@ts-ignore
      blueSpy && (blueSpy.isSpyMaster = false);
    }
    player.isSpyMaster = true;
    this.pushHistory({ player, action: "isSpyMaster" });
    this._io.to(this._uuid).emit("playersUpdate", this.players);
  }

  pushHistory(historyItem: IHistoryItem) {
    this._history.unshift(historyItem);
    this._io.to(this._uuid).emit("historyMessage", historyItem);
  }

  pushMessage(message: IChatMessage) {
    this._chat.unshift(message);
    this._io.to(this._uuid).emit("message", message);
  }

  tryStartGame(playerUUID: string) {
    if (
      this._state === GameState.beforeStart &&
      this._players[playerUUID] &&
      this._players[playerUUID].isAdmin
    ) {
      this.setGameState(GameState.blueSpyTalking);
      this.pushHistory({
        player: this._players[playerUUID],
        action: "startedGame",
      });

      this._eventEmitter.emit("boardUpdate");
    }
  }

  tryReveal(playerUUID: string, pos: number) {
    if (this._players[playerUUID] && !this._players[playerUUID].isSpyMaster) {
      const cardRevealed = this._boardManager.revealCard(pos);
      if (cardRevealed) {
        this.pushHistory({
          player: this._players[playerUUID],
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
    if (this._players[user.uuid]) {
      return;
    }

    let team: "blue" | "red";
    let isSpyMaster = false;

    if (this.playersBlue() > this.playersRed()) {
      if (!this.redspyMaster) {
        isSpyMaster = true;
      }
      team = "red";
    } else {
      if (!this.blueSpyMaster) {
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

    this._players[user.uuid] = player;

    this._io.to(this._uuid).emit("playersUpdate", this.players);
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

    return this._players[param].isSpyMaster;
  }

  startGame() {
    if (
      Object.entries(this._players).length >= 4 &&
      this._state === GameState.beforeStart
    ) {
      this._state =
        this._first === "blue"
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
    if (this._players[param]) {
      const deletedPlayer = this._players[param];
      delete this._players[param];
      this.pushHistory({ player: deletedPlayer, action: "disconnected" });

      if (deletedPlayer.isAdmin) {
        const found = Object.entries(this._players)[0];
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
        const found: [string, IPlayer] = Object.entries(this._players).find(
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

      this._io.to(this._uuid).emit("playersUpdate", this.players);
    }
  }
}
