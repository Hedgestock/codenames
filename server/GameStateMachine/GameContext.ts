import { IPlayer, Team, IGuess } from "../../shared";
import BoardManager from "../BoardManager";
import { IGameState } from "./IGameState";
import { BeforeStart } from "./BeforeStart";
import { EventEmitter } from "events";
import { BlueSpyTalking } from "./BlueSpyTalking";

export class GameContext {
  private _state: IGameState;
  private _eventEmitter: EventEmitter;
  readonly players: Map<string, IPlayer>;

  constructor(eventEmitter: EventEmitter) {
    this._eventEmitter = eventEmitter;
    this.state = new BeforeStart();
  }

  set state(newState: IGameState) {
    this._state = newState;
    this._eventEmitter.emit("gameStateChanged", newState.state);
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

  passTurn(player: IPlayer) {
    return this._state.passTurn(this, player);
  }

  setGuess(player: IPlayer, guess: IGuess) {
    return this._state.setGuess(this, player, guess);
  }
}
