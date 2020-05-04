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
    this.state = GameState.beforeStart;
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

  getPlayers() {
    return this.players;
  }

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

  private setGameState(newState: GameState) {
    this.state = newState;
    this.io.to(this.uuid).emit("gameStateChanged", this.state);
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
    throw "Not Implemented";
  }

  makePlayerBlue(playerUUID: string) {
    throw "Not Implemented";
  }

  makePlayerGameMaster(user: IUser) {
    throw "Not Implemented";
  }

  makePlayerSpy(player: IUser) {
    throw "Not Implemented";
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

      this.eventEmitter.emit("boardUpdate");
    }
  }

  tryReveal(playerUUID: string, pos: number) {
    if (
      this.players[playerUUID] &&
      this.board[pos] &&
      !this.players[playerUUID].isSpyMaster &&
      !this.board[pos].revealed
    ) {
      this.board[pos].revealed = true;
      this.pushHistory({
        player: this.players[playerUUID],
        action: "revealed",
        card: this.board[pos],
      });
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
    if (this.players[user.uuid]) {
      return;
    }

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
      const deletedPlayer = this.players[param];
      delete this.players[param];
      this.pushHistory({ player: deletedPlayer, action: "disconnected" });

      if (deletedPlayer.isAdmin) {
        const found = Object.entries(this.players)[0];
        if (found) {
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
        if (deletedPlayer.team === "red") {
          this.spyMasterRed = newSpyMasterId;
        }
        if (deletedPlayer.team === "blue") {
          this.spyMasterBlue = newSpyMasterId;
        }
      }
    }
  }
}
