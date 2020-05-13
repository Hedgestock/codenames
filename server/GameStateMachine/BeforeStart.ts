import { IPlayer, Team, EGameState } from "../../shared";
import { SpyTalking } from "./SpyTalking";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";

export class BeforeStart implements IGameState {
  readonly state = EGameState.beforeStart;

  revealCard() {
    return false;
  }

  startGame(context: GameContext, player: IPlayer, first: Team) {
    if (player.isGameMaster) {
      context.state = new SpyTalking(first);

      return true;
    }
    return false;
  }

  restartGame() {
    return false;
  }
  
  passTurn() {
    return false;
  }

  setGuess() {
    return false;
  }
}
