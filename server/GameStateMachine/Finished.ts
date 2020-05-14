import { EGameState, IPlayer, Team } from "../../shared";
import { BeforeStart } from "./BeforeStart";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";
import BoardManager from "../BoardManager";

export class Finished implements IGameState {
  readonly state: EGameState;

  constructor(team: Team) {
    this.state =
      team == "blue" ? EGameState.blueTeamWon : EGameState.redTeamWon;
  }

  revealCard(
    context: GameContext,
    player: IPlayer,
    board: BoardManager,
    pos: number
  ) {
    const card = board.revealCard(pos);
    if (!card) return false;
    context.pushHistory({
      player,
      action: "revealed",
      card,
    });
    context.eventEmitter.emit("boardUpdate");
    return true;
  }

  startGame() {
    return false;
  }

  restartGame(context: GameContext, player: IPlayer, board: BoardManager) {
    if (player.isGameMaster) {
      board.initBoard();
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
