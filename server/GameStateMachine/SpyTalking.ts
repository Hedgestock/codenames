import { IGameState } from "./IGameState";
import { GameContext } from "./GameContext";
import { IGuess, IPlayer, Team, EGameState } from "../../shared";
import { TeamGuessing } from "./TeamGuessing";

export class SpyTalking implements IGameState {
  private _team: Team;
  readonly state: EGameState;

  constructor(team: Team) {
    this._team = team;
    this.state =
      team == "blue" ? EGameState.blueSpyTalking : EGameState.redSpyTalking;
  }

  revealCard() {
    return false;
  }

  startGame() {
    return false;
  }

  restartGame() {
    return false;
  }

  passTurn() {
    return false;
  }

  setGuess(context: GameContext, player: IPlayer, guess: IGuess) {
    if (player.isSpyMaster && player.team == this._team) {
      context.state = new TeamGuessing(this._team);
      context.guess = guess;
      return true;
    }
    return false;
  }
}
