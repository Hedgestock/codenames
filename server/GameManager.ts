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
  EPlayerStatus,
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
    this._players = new Map<string, IPlayer>();
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
  private _players: Map<string, IPlayer>;
  private _boardManager: BoardManager;
  private _state: GameState;
  private _first: Team;

  get eventEmitter() {
    return this._eventEmitter;
  }

  get gameMasterUUID() {
    return this._gameMasterUUID;
  }

  private makeGameMaster(uuid: string): boolean {
    const player = this._players.get(uuid);
    if (player) {
      this._players.get(this._gameMasterUUID).isGameMaster = false;
      player.isGameMaster = true;
      this._gameMasterUUID = uuid;
      return true;
    }
    return false;
  }

  get board() {
    return this._boardManager;
  }

  get players() {
    return this._players;
  }

  get connectedPlayers() {
    return Array.from(this._players.entries()).filter(([uuid, player]) => player.status === EPlayerStatus.CONNECTED);
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

  get blueSpyMaster(): IPlayer {
    return this.getSpyMaster("blue");
  }

  get redspyMaster(): IPlayer {
    return this.getSpyMaster("red");
  }

  private getSpyMaster(team: Team): IPlayer {
    for (const [uuid, player] of this._players.entries()) {
      if (player.isSpyMaster && player.team === team) return player;
    }
    return null;
  }

  get gameMaster(): IPlayer {
    for (const [uuid, player] of this._players.entries()) {
      if (player.isGameMaster) return player;
    }
    return null;
  }

  private setGameState(newState: GameState) {
    this._state = newState;
    this._io.to(this._uuid).emit("gameStateChanged", this._state);
  }

  playersBlue(): number {
    return this.countPlayers("team", "blue");
  }

  playersRed(): number {
    return this.countPlayers("team", "red");
  }

  private countPlayers(property: string, value: any) {
    return Array.from(this._players.values()).filter(
      (player) => player[property] === value
    ).length;
  }

  makePlayerRed(playerUUID: string) {
    throw "Not implemented";
    const player: IPlayer = this._players.get(playerUUID);
    player && (player.team = "red");
    this.emitPlayersUpdate();
  }

  makePlayerBlue(playerUUID: string) {
    throw "Not implemented";
    const player: IPlayer = this._players.get(playerUUID);
    player && (player.team = "blue");
    this.emitPlayersUpdate();
  }

  makePlayerGameMaster(playerUUID: string) {
    throw "Not implemented";
    this.emitPlayersUpdate();
  }

  makeSpyMaster(playerUUID: string) {
    const player: IPlayer = this._players.get(playerUUID);
    if (!player || player.isSpyMaster) return;
    if (player.team == "red") {
      const redSpy = this.redspyMaster;
      redSpy && (redSpy.isSpyMaster = false);
    } else {
      const blueSpy = this.blueSpyMaster;
      blueSpy && (blueSpy.isSpyMaster = false);
    }
    player.isSpyMaster = true;
    this.pushHistory({ player, action: "isSpyMaster" });
    this.emitPlayersUpdate();
  }

  private emitPlayersUpdate() {
    this._io
      .to(this._uuid)
      .emit("playersUpdate", Array.from(this._players.entries()));
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
      this._players.get(playerUUID) &&
      this._players.get(playerUUID).isGameMaster
    ) {
      this.setGameState(GameState.blueSpyTalking);
      this.pushHistory({
        player: this._players.get(playerUUID),
        action: "startedGame",
      });

      this._eventEmitter.emit("boardUpdate");
    }
  }

  tryReveal(playerUUID: string, pos: number) {
    if (
      this._players.get(playerUUID) &&
      !this._players.get(playerUUID).isSpyMaster
    ) {
      const cardRevealed = this._boardManager.revealCard(pos);
      if (cardRevealed) {
        this.pushHistory({
          player: this._players.get(playerUUID),
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
    if (this._players.get(user.uuid)) {
      const player = this._players.get(user.uuid);
      player.name = user.name;
      player.status = EPlayerStatus.CONNECTED;
      this.pushHistory({
        player,
        action: "reconnected",
      });
    } else {
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
        isGameMaster: this.isGameMaster(user),
        team,
        isSpyMaster,
        name: user.name,
        status: EPlayerStatus.CONNECTED,
      };

      if (player.isGameMaster) {
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

      this._players.set(user.uuid, player);
    }
    this.emitPlayersUpdate();
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

    return this._players.get(param).isSpyMaster;
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

  disconnectPlayer(param: string | IUser) {
    if (typeof param !== "string") {
      param = param.uuid;
    }
    if (this._players.get(param)) {
      const disconectedPlayer = this._players.get(param);
      disconectedPlayer.status = EPlayerStatus.DISCONNECTED;
      this.pushHistory({ player: disconectedPlayer, action: "disconnected" });

      if (disconectedPlayer.isGameMaster) {
        const found = this.connectedPlayers[0];
        if (found) {
          this.makeGameMaster(found[0]);
        }
      }

      if (disconectedPlayer.isSpyMaster) {
        const found = this.connectedPlayers.find(
          ([uuid, player]) => player.team === disconectedPlayer.team
        );

        if (found) {
          this.makeSpyMaster(found[0]);
        }
      }

      this.emitPlayersUpdate();
    }
  }
}
