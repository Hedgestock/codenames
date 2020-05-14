import { EventEmitter } from "events";
import { IGuess, IHistoryItem, IPlayer, Team } from "../../shared";
import BoardManager from "../BoardManager";
import { BeforeStart } from "./BeforeStart";
import { IGameState } from "./IGameState";

export class GameContext {
  private _state: IGameState;
  private _guess: IGuess;
  readonly eventEmitter: EventEmitter;
  readonly players: Map<string, IPlayer>;
  readonly pushHistory: (historyItem: IHistoryItem) => void;

  constructor(
    eventEmitter: EventEmitter,
    ph: (historyItem: IHistoryItem) => void
  ) {
    this.eventEmitter = eventEmitter;
    this.pushHistory = ph;
    this.state = new BeforeStart();
  }

  get state() {
    return this._state;
  }

  set state(newState: IGameState) {
    this._state = newState;
    this.pushHistory({ action: this._state.state });
    this.eventEmitter.emit("gameStateChanged", newState.state);
  }

  get guess() {
    return this._guess;
  }

  set guess(value: IGuess) {
    this._guess = value;
    this.pushHistory({ ...value, action: "talked" });
  }

  revealCard(player: IPlayer, board: BoardManager, pos: number) {
    return this._state.revealCard(this, player, board, pos);
  }

  startGame(player: IPlayer, first: Team) {
    return this._state.startGame(this, player, first);
  }

  restartGame(player: IPlayer, board: BoardManager) {
    return this._state.restartGame(this, player, board);
  }

  passTurn(player: IPlayer) {
    return this._state.passTurn(this, player);
  }

  setGuess(player: IPlayer, guess: IGuess) {
    return this._state.setGuess(this, player, guess);
  }
}
