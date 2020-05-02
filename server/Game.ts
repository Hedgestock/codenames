import socketio from "socket.io";

interface IChatMessage {
  author: string;
  message: string;
}

interface IPlayer {
  uuid: string;
  name: string;
}

interface ICard {
  word: string;
  color: undefined | "blue" | "red" | "white" | "black";
  revealed: boolean;
}

export default class Game {
  constructor(gameMaster: IPlayer, uuid: string, io: socketio.Server) {
    this.io = io;
    this.uuid = uuid;
    this.gameMaster = gameMaster.uuid;
    this.history = [];
    this.chat = [];
    this.spyMasterBlue = undefined;
    this.spyMasterRed = undefined;
    this.playersBlue = {};
    this.playersRed = {};
    this.players = {};
    this.players[gameMaster.uuid] = gameMaster.name;
    this.board = this.initBoard();
  }

  io: socketio.Server;
  uuid: string;
  history: any[];
  chat: IChatMessage[];
  gameMaster: string;
  spyMasterBlue: string;
  spyMasterRed: string;
  playersBlue;
  playersRed;
  players;
  board: ICard[];

  private initBoard(
    remainingFirst = 9,
    remainingSecond = 8,
    first: "blue" | "red" = "blue"
  ): ICard[] {
    const second: "blue" | "red" = first === "blue" ? "red" : "blue";
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
        board[index].color = first;
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

  makePlayerRed(player: IPlayer) {
    if (this.players[player.uuid]) {
      delete this.playersRed[player.uuid];
      this.playersBlue[player.uuid] = player.name;
    }
  }

  makePlayerBlue(player: IPlayer) {
    if (this.players[player.uuid]) {
      delete this.playersBlue[player.uuid];
      this.playersRed[player.uuid] = player.name;
    }
  }

  makePlayerGameMaster(player: IPlayer) {
    if (this.players[player.uuid]) {
      this.gameMaster = player.uuid;
    }
  }

  makePlayerBlueSpy(player: IPlayer) {
    if (this.playersBlue[player.uuid]) {
      this.spyMasterBlue = player.uuid;
    }
  }

  makePlayerRedSpy(player: IPlayer) {
    if (this.playersRed[player.uuid]) {
      this.spyMasterRed = player.uuid;
    }
  }

  pushMessage(message: IChatMessage) {
    this.chat.push(message);
  }

  sendBoard() {
    this.io.to(this.uuid).emit("gameUpdate", this.board);
  }
}
