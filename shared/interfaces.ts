export enum GameState {
  beforeStart,
  blueSpyTalking,
  blueGuess,
  redSpyTalking,
  redGuess,
  finished,
}

export interface IChatMessage {
  author: string;
  message: string;
}

export interface IUser {
  uuid: string;
  name: string;
}

export interface ICard {
  word: string;
  color: undefined | "blue" | "red" | "white" | "black";
  revealed: boolean;
}

export interface IPlayer {
  team: "blue" | "red";
  isSpyMaster: boolean;
  admin: boolean;
  name: string;
}

export interface IHistoryItem {
  player: IPlayer;
  action: HistoryAction;
}

export type HistoryAction = "init" | "isRed" | "isBlue" | "isSpyMaster";
