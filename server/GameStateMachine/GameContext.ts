import { IPlayer, Team, IGuess, IHistoryItem } from "../../shared";
import BoardManager from "../BoardManager";
import { IGameState } from "./IGameState";
import { BeforeStart } from "./BeforeStart";
import { EventEmitter } from "events";
import { SpyTalking } from "./SpyTalking";

export class GameContext {
  private _state: IGameState;
  readonly eventEmitter: EventEmitter;
  readonly players: Map<string, IPlayer>;
  readonly pushHistory: (historyItem: IHistoryItem) => void;

  constructor(eventEmitter: EventEmitter, ph: (historyItem: IHistoryItem) => void) {
    this.eventEmitter = eventEmitter;
    this.pushHistory = ph;
    this.state = new BeforeStart();
  }

  set state(newState: IGameState) {
    this._state = newState;
    this.eventEmitter.emit("gameStateChanged", newState.state);
  }

  get state() {
    return this._state;
  }


  revealCard(player: IPlayer, board: BoardManager, pos: number) {
    return this._state.revealCard(this, player, board, pos);
  }

  startGame(player: IPlayer, first: Team) {
    return this._state.startGame(this, player, first);
  }

  restartGame(player: IPlayer) {
    return this._state.restartGame(this, player);
  }

  passTurn(player: IPlayer) {
    return this._state.passTurn(this, player);
  }

  setGuess(player: IPlayer, guess: IGuess) {
    return this._state.setGuess(this, player, guess);
  }
}
