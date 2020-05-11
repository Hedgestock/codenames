import { IPlayer, Team, EGameState } from "../../shared";
import { BlueSpyTalking } from "./BlueSpyTalking";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";
import { RedSpyTalking } from "./RedSpyTalking";

export class BeforeStart implements IGameState {
  readonly state = EGameState.beforeStart;

  revealCard() {
    return undefined;
  }

  startGame(context: GameContext, player: IPlayer, first: Team) {
    if (player.isGameMaster) {
      context.state =
        first === "blue" ? new BlueSpyTalking() : new RedSpyTalking();

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
