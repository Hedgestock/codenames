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
} from "../shared/interfaces";

export default class Game {
  constructor(gameMaster: IUser, uuid: string, io: socketio.Server) {
    this.first = "blue";
    this.io = io;
    this.uuid = uuid;
    this.gameMaster = gameMaster.uuid;
    this.history = [];
    this.chat = [];
    this.spyMasterBlue = undefined;
    this.spyMasterRed = undefined;
    this.players = {};
    this.board = this.initBoard();
    this.eventEmitter = new EventEmitter();
  }

  eventEmitter: EventEmitter;
  private io: socketio.Server;
  private uuid: string;
  private history: any[];
  private chat: IChatMessage[];
  private gameMaster: string;
  private spyMasterBlue: string;
  private spyMasterRed: string;
  private players;
  private board: ICard[];
  private state: GameState;
  private first: "blue" | "red";

  getSpyBoard(): ICard[] {
    return this.board;
  }

  getPlayerBoard(): ICard[] {
    return this.board.map((c) => {
      if (!c.revealed) {
        return { ...c, color: undefined };
      }
      return c;
    });
    // this.io.to(this.uuid).emit("boardUpdate", this.board);
  }

  getChat() {
    return this.chat;
  }

  getHistory() {
    return this.history;
  }

  private initBoard(remainingFirst = 9, remainingSecond = 8): ICard[] {
    const second: "blue" | "red" = this.first === "blue" ? "red" : "blue";
    let board: ICard[] = [
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
      { word: "word", revealed: false, color: "white" },
    ];

    let index = Math.floor(Math.random() * board.length);
    board[index].color = "black";

    while (remainingFirst) {
      index = Math.floor(Math.random() * board.length);
      if (board[index].color === "white") {
        board[index].color = this.first;
        remainingFirst--;
      }
    }

    while (remainingSecond) {
      index = Math.floor(Math.random() * board.length);
      if (board[index].color === "white") {
        board[index].color = second;
        remainingSecond--;
      }
    }

    return board;
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
    if (this.players[playerUUID] && this.players[playerUUID].team === "blue") {
      if ((this.players[playerUUID].role = "spyMaster")) {
        this.players[playerUUID].role = "player";
        this.spyMasterBlue = undefined;
      }
      this.players[playerUUID].team = "red";
    }
  }

  makePlayerBlue(playerUUID: string) {
    if (this.players[playerUUID] && this.players[playerUUID].team === "red") {
      if ((this.players[playerUUID].role = "spyMaster")) {
        this.players[playerUUID].role = "player";
        this.spyMasterRed = undefined;
      }
      this.players[playerUUID].team = "blue";
    }
  }

  makePlayerGameMaster(user: IUser) {
    if (this.players[user.uuid]) {
      this.gameMaster = user.uuid;
    }
  }

  makePlayerSpy(player: IUser) {
    throw "Not Implemented";
  }

  pushHistory(historyItem: IHistoryItem) {
    this.history.push(historyItem);
    this.io.to(this.uuid).emit("historyMessage", historyItem);
  }

  pushMessage(message: IChatMessage) {
    this.chat.push(message);
    this.io.to(this.uuid).emit("message", message);
  }

  revealCard(playerUUID: string, pos: number) {
    if (!this.players[playerUUID].isSpyMaster) {
      this.board[pos].revealed = true;
      this.eventEmitter.emit("boardUpdate");
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
    let team: "blue" | "red";
    let isSpyMaster = false;

    if (this.playersBlue() > this.playersRed()) {
      if (!this.spyMasterRed) {
        this.spyMasterRed = user.uuid;
        isSpyMaster = true;
      }
      team = "red";
    } else {
      if (!this.spyMasterBlue) {
        this.spyMasterBlue = user.uuid;
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
  }

  isGameMaster(param: string | IUser) {
    if (typeof param === "string") {
      return param === this.gameMaster;
    }

    return param.uuid === this.gameMaster;
  }

  isBlueSpy(param: string | IUser) {
    if (typeof param === "string") {
      return param === this.spyMasterBlue;
    }

    return param.uuid === this.spyMasterBlue;
  }

  isRedSpy(param: string | IUser) {
    if (typeof param === "string") {
      return param === this.spyMasterRed;
    }

    return param.uuid === this.spyMasterRed;
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
      if (this.players[param].isSpyMaster) {
        if (this.players[param].team === "red") {
          this.spyMasterRed = undefined;
        }
        if (this.players[param].team === "blue") {
          this.spyMasterBlue = undefined;
        }
      }
      delete this.players[param];
    }
  }
}
