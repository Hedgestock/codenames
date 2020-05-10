import { HistoryAction, ICard, IPlayer } from ".";

export interface IHistoryItem {
  player?: IPlayer;
  action: HistoryAction;
  card?: ICard;
}
