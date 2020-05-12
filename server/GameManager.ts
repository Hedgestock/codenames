import socketio from "socket.io";
import { EventEmitter } from "events";
import {
  IUser,
  IChatMessage,
  EGameState,
  IPlayer,
  IHistoryItem,
  HistoryAction,
  Team,
} from "../shared";
import BoardManager from "./BoardManager";
import { GameContext } from "./GameStateMachine/GameContext";

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
    console.log(this._eventEmitter);
    this._context = new GameContext(this._eventEmitter);
  }

  private _eventEmitter: EventEmitter;
  private _gameMasterUUID: string;
  private _io: socketio.Server;
  private _uuid: string;
  private _history: any[];
  private _chat: IChatMessage[];
  private _players: Map<string, IPlayer>;
  private _boardManager: BoardManager;
  private _context: GameContext;
  private _first: Team;

  get context() {
    return this._context;
  }

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

  get connectedPlayers() {
    return Array.from(this._players.entries()).filter(
      ([uuid, player]) => player.socketsNo > 0
    );
  }

  get chat() {
    return this._chat;
  }

  get history() {
    return this._history;
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

  // private setGameState(newState: EGameState) {
  //   this._state = newState;
  //   this._io.to(this._uuid).emit("gameStateChanged", this._state);
  // }

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

  changePlayerTeam(uuid: string): boolean {
    const player: IPlayer = this._players.get(uuid);
    if (player) {
      const prevTeam = player.team;
      player.team = player.team === "blue" ? "red" : "blue";
      if (player.isSpyMaster) {
        const found = Array.from(this._players.entries()).find(
          ([uuid, p]) => prevTeam == p.team
        );
        player.isSpyMaster = false;
        if (found) {
          this.makePlayerSpyMaster(found[0]);
        }
      }
      this.emitPlayersUpdate();
      this.pushHistory({
        player,
        action: ("is" + this.capitalize(player.team)) as HistoryAction,
      });
      return true;
    }
    return false;
  }

  makePlayerGameMaster(playerUUID: string): boolean {
    if (this._gameMasterUUID === playerUUID) return;
    const player = this._players.get(playerUUID);
    if (player) {
      this._players.get(this._gameMasterUUID).isGameMaster = false;
      player.isGameMaster = true;
      this._gameMasterUUID = playerUUID;
      this.emitPlayersUpdate();
      this.pushHistory({
        player,
        action: "isGameMaster",
      });
      return true;
    }
    return false;
  }

  makePlayerSpyMaster(playerUUID: string) {
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
    this._eventEmitter.emit("boardUpdate");
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
    const player = this._players.get(playerUUID);
    if (player && this.context.startGame(player, this._first)) {
      this.pushHistory({
        player: player,
        action: "startedGame",
      });
      this._eventEmitter.emit("boardUpdate");
      return true;
    }
    return false;
  }

  tryReveal(playerUUID: string, pos: number) {
    const player = this._players.get(playerUUID);
    if (player) {
      const cardRevealed = this._context.revealCard(
        player,
        this._boardManager,
        pos
      );
      if (cardRevealed) {
        this.pushHistory({
          player: this._players.get(playerUUID),
          action: "revealed",
          card: cardRevealed,
        });
        this._eventEmitter.emit("boardUpdate");
        return true;
      }
    }
    return false;
  }

  tryPassTurn(playerUUID: string) {
    const player = this._players.get(playerUUID);
    if (player) {
      return this._context.passTurn(player);
    }
    return false;
  }

  trySetGuess(playerUUID: string) {
    const player = this._players.get(playerUUID);
    if (player) {
      return this._context.setGuess(player, null);
    }
    return false;
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
      player.socketsNo++;

      if (player.socketsNo == 1) {
        this.pushHistory({
          player,
          action: "reconnected",
        });
      }
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
        isGameMaster: this._gameMasterUUID === user.uuid,
        team,
        isSpyMaster,
        name: user.name,
        socketsNo: 1,
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

  disconnectPlayer(param: string | IUser) {
    if (typeof param !== "string") {
      param = param.uuid;
    }
    if (this._players.get(param)) {
      const disconectedPlayer = this._players.get(param);
      disconectedPlayer.socketsNo--;
      if (disconectedPlayer.socketsNo > 0) return;
      if (this.connectedPlayers.length == 0) {
        this.eventEmitter.emit("gameIsEmpty");
        return;
      }
      this.pushHistory({ player: disconectedPlayer, action: "disconnected" });

      if (disconectedPlayer.isGameMaster) {
        const found = this.connectedPlayers[0];
        if (found) {
          this.makePlayerGameMaster(found[0]);
        }
      }

      this.emitPlayersUpdate();
    }
  }
}
