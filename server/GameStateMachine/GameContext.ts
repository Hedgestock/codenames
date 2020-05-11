import { IPlayer, Team, IGuess } from "../../shared";
import BoardManager from "../BoardManager";
import { IGameState } from "./IGameState";
import { BeforeStart } from "./BeforeStart";
import { EventEmitter } from "events";

export class GameContext {
  private _state: IGameState;
  private _eventEmitter: EventEmitter;
  readonly players: Map<string, IPlayer>;

  constructor(eventEmitter: EventEmitter) {
    this.state = new BeforeStart();
    this._eventEmitter = eventEmitter;
  }

  set state(newState: IGameState) {
    this._state = newState;
    this._eventEmitter.emit("gameStateChanged", newState.state)
  }

  revealCard(player: IPlayer, board: BoardManager, pos: number) {
    return this.state.revealCard(this, player, board, pos);
  }

  startGame(player: IPlayer, first: Team) {
    return this.state.startGame(this, player, first);
  }

  passTurn(player: IPlayer){
    return this.state.passTurn(this, player);
  }

  setGuess(player: IPlayer, guess: IGuess) {
    return this.state.setGuess(this, player, guess);
  }
}
