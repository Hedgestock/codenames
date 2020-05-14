import { EGameState } from "./EGameState";

export type HistoryAction =
  | "init"
  | "isRed"
  | "isBlue"
  | "isSpyMaster"
  | "isGameMaster"
  | "disconnected"
  | "reconnected"
  | "revealed"
  | "startedGame"
  | EGameState;
