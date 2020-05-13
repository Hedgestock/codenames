import { EGameState, IPlayer, Team } from "../../shared";
import { BeforeStart } from "./BeforeStart";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";

export class Finished implements IGameState {
  readonly state: EGameState;

  constructor(team: Team) {
    this.state =
      team == "blue" ? EGameState.blueTeamWon : EGameState.redTeamWon;
  }

  revealCard() {
    return false;
  }

  startGame() {
    return false;
  }

  restartGame(context: GameContext, player: IPlayer) {
    if (player.isGameMaster) {
      context.state = new BeforeStart();

      return true;
    }
    return false;
  }

  passTurn() {
    return false;
  }

  setGuess() {
    return false;
  }
}
