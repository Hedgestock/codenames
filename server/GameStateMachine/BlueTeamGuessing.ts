import { IPlayer, EGameState } from "../../shared";
import BoardManager from "../BoardManager";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";
import { RedSpyTalking } from "./RedSpyTalking";

export class BlueTeamGuessing implements IGameState {
  readonly state = EGameState.blueTeamGuessing;

  revealCard(
    context: GameContext,
    player: IPlayer,
    board: BoardManager,
    pos: number
  ) {
    if (player.team == "blue" && !player.isSpyMaster) {
      // TODO: actually use the guess object

      return board.revealCard(pos);
    }
    return undefined;
  }

  startGame() {
    return false;
  }

  passTurn(context: GameContext, player: IPlayer) {
    if ((player.team == "blue" && !player.isSpyMaster) || player.isGameMaster) {
      context.state = new RedSpyTalking();
      return true;
    }
    return false;
  }

  setGuess() {
    return false;
  }
}
