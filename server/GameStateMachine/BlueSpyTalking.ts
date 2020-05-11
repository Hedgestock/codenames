import { IGameState } from "./IGameState";
import { GameContext } from "./GameContext";
import { IGuess, IPlayer, Team, EGameState } from "../../shared";
import { BlueTeamGuessing } from "./BlueTeamGuessing";

export class BlueSpyTalking implements IGameState {
  readonly state = EGameState.blueSpyTalking;

  revealCard() {
    return undefined;
  }

  startGame() {
    return false;
  }

  passTurn() {
    return false;
  }

  setGuess(context: GameContext, player: IPlayer, guess: IGuess) {
    if (player.isSpyMaster && player.team === "blue") {
      // TODO: Set guess
      context.state = new BlueTeamGuessing();
      return true;
    }
    return false;
  }
}
