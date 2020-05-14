import { HistoryAction, ICard, IPlayer } from ".";

export interface IHistoryItem {
  player?: IPlayer;
  wordNumber?: number;
  action: HistoryAction;
  hint?: string;
  card?: ICard;
}
