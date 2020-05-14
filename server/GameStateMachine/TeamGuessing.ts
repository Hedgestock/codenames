import { IPlayer, EGameState, Team } from "../../shared";
import BoardManager from "../BoardManager";
import { GameContext } from "./GameContext";
import { IGameState } from "./IGameState";
import { SpyTalking } from "./SpyTalking";
import { Finished } from "./Finished";

export class TeamGuessing implements IGameState {
  private _team: Team;
  readonly state: EGameState;

  constructor(team: Team) {
    this._team = team;
    this.state =
      team == "blue" ? EGameState.blueTeamGuessing : EGameState.redTeamGuessing;
  }

  revealCard(
    context: GameContext,
    player: IPlayer,
    board: BoardManager,
    pos: number
  ) {
    if (player.team == this._team && !player.isSpyMaster) {
      const card = board.revealCard(pos);
      if (!card) return false;

      context.pushHistory({
        player,
        action: "revealed",
        card,
      });

      context.eventEmitter.emit("boardUpdate");

      if (card.color == "black") {
        context.state = new Finished(this._team == "blue" ? "red" : "blue");
      } else if (card.color == "white") {
        context.state = new SpyTalking(this._team == "blue" ? "red" : "blue");
      } else if (board.getRemainingCards(card.color) <= 0) {
        context.state = new Finished(card.color);
      } else if (card.color != this._team) {
        context.state = new SpyTalking(this._team == "blue" ? "red" : "blue");
        // TODO: actually use the guess object
      }
      
      return true;
    }
    return false;
  }

  startGame() {
    return false;
  }

  restartGame() {
    return false;
  }

  passTurn(context: GameContext, player: IPlayer) {
    if (
      (player.team == this._team && !player.isSpyMaster) ||
      player.isGameMaster
    ) {
      context.state = new SpyTalking(this._team == "blue" ? "red" : "blue");
      return true;
    }
    return false;
  }

  setGuess() {
    return false;
  }
}
