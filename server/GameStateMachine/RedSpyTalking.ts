import { IGuess, IPlayer, EGameState } from "../../shared";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";
import { RedTeamGuessing } from "./RedTeamGuessing";

export class RedSpyTalking implements IGameState {
  readonly state = EGameState.redSpyTalking;

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
    if (player.isSpyMaster && player.team === "red") {
      // TODO: Set guess
      context.state = new RedTeamGuessing();
      return true;
    }
    return false;
  }
}
