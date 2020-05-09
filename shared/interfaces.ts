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
  color: undefined | Team | "white" | "black";
  revealed: boolean;
}

export interface IPlayer {
  team: Team
  isSpyMaster: boolean;
  isGameMaster: boolean;
  name: string;
  status: EPlayerStatus;
}

export enum EPlayerStatus {
  CONNECTED,
  DISCONNECTED
}

export interface IHistoryItem {
  player?: IPlayer;
  action: HistoryAction;
  card?: ICard;
}

export type HistoryAction =
  | "init"
  | "isRed"
  | "isBlue"
  | "isSpyMaster"
  | "isGameMaster"
  | "disconnected"
  | "reconnected"
  | "revealed"
  | "startedGame";

export interface SocketConnectedProps {
    socket: SocketIOClient.Socket;
  }

  export type Team = "blue" | "red";
