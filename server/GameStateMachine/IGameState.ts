import { IGuess, IPlayer, Team, ICard, EGameState } from "../../shared";
import { GameContext } from "./GameContext";
import BoardManager from "../BoardManager";

export interface IGameState {
  readonly state: EGameState;
  revealCard(
    context: GameContext,
    player: IPlayer,
    board: BoardManager,
    pos: number
  ): boolean;
  startGame(context: GameContext, player: IPlayer, first: Team): boolean;
  restartGame(context: GameContext, player: IPlayer, board: BoardManager): boolean;
  passTurn(context: GameContext, player: IPlayer): boolean;
  setGuess(context: GameContext, player: IPlayer, guess: IGuess): boolean;
}
