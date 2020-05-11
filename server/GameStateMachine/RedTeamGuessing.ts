import { IPlayer, EGameState } from "../../shared";
import BoardManager from "../BoardManager";
import { BlueSpyTalking } from "./BlueSpyTalking";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";

export class RedTeamGuessing implements IGameState {
  readonly state = EGameState.redTeamGuessing;
  
  revealCard(
    context: GameContext,
    player: IPlayer,
    board: BoardManager,
    pos: number
  ) {
    if (player.team == "red" && !player.isSpyMaster) {
      // TODO: actually use the guess object

      return board.revealCard(pos);
    }
    return undefined;
  }

  startGame() {
    return false;
  }

  passTurn(context: GameContext, player: IPlayer) {
    if ((player.team == "red" && !player.isSpyMaster) || player.isGameMaster) {
      context.state = new BlueSpyTalking();
      return true;
    }
    return false;
  }

  setGuess() {
    return false;
  }
}
